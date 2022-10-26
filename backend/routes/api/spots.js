const express = require('express');
const { User, Spot, Review, SpotImage } = require('../../db/models');
const spot = require('../../db/models/spot');
const router = express.Router();
//Returns all spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll()
    let avg;
    for (let spot of spots) {

        let reviews = await Review.findAll({
            where: { spotId: spot.id },
            attributes: ["stars"],
            raw: true
        })

        let sum = 0
        for (let review of reviews) {
            sum += review.stars
        }
        avg = sum / reviews.length
        spot.dataValues.avgRating = avg.toFixed(1)
        let previewImages = await SpotImage.findAll({
            where: {spotId: spot.ownerId},
            attributes:["url"],
            raw:true
        })
        if(previewImages.length){
            spot.dataValues.previewImage = previewImages[0].url
        }
    }
    res.json({
        Spots: spots
    })
})
//Returns the Spots for whoever is logged in
router.get('/current', async (req, res) => {
    const { user } = req;
    if (user) {
        let spots = await Spot.findAll({
            where: ownerId = user.id
        })
        let reviews = await Review.findAll({
            where: { spotId: spots[0].id },
            attributes: ["stars"],
            raw: true
        })

        let sum = 0
        for (let review of reviews) {
            sum += review.stars
        }
        avg = sum / reviews.length
        spots[0].dataValues.avgRating = avg.toFixed(1)
        let previewImages = await SpotImage.findAll({
            where: {spotId: spots[0].ownerId},
            attributes:["url"],
            raw:true
        })
        spots[0].dataValues.previewImage = previewImages[0].url
        res.json({
            Spots: spots
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });

})

//! Get details of a Spot from an Id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    let spots = await Spot.findByPk(spotId, {})
    if (spots === null) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    let reviews = await Review.findAll({
        where: { spotId: spots.id },
        attributes: ["stars"],
        raw: true
    })

    let sum = 0
    let reviewCount = 0
    for (let review of reviews) {
        reviewCount++
        sum += review.stars
    }
    avg = sum / reviews.length
    spots.dataValues.numReviews = reviewCount
    spots.dataValues.avgRating = avg.toFixed(1)
    //Gets the Preview images for a certain spot
    let previewImages = await SpotImage.findAll({
        where: {spotId: spots.id},
        attributes:["id","url","preview"],
        raw:true
    })
    //Turns values 1 and 0 into booleans
    for(let preview of previewImages){
        if(preview.preview === 1){
            preview.preview = true
        }
        if(preview.preview === 0){
            preview.preview = false
        }
    }
    //Adds Datavalue previewImage to Spots
    spots.dataValues.previewImage = previewImages
    let owner = await User.findAll({
        where: {id:spots.ownerId},
        attributes:["id","firstName","lastName"]
    })
    spots.dataValues.Owner = owner
    res.json(
        spots
    )
})

//!Create a Spot
router.post('/', async (req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (user) {
        if (!address) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: "address is required"
            })
        }
        if (!city) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: " City is required "
            })
        }
        if (!state) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: " State is required"
            })
        }
        if (!country) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: " Country is required"
            })
        }
        if (!lat || isNaN(lat)) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: " Latitude is not value"
            })
        }
        if (!lng || isNaN(lng)) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: " Longitude is not valid"
            })
        }
        if (!name || name.split(``).length > 50) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: "Name is required and must be less than 50 characters"
            })
        }
        if (!description) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: " Description is required"
            })
        }
        if (!price || isNaN(price)) {
            res.status(400).json({
                message: 'Validation Error',
                statusCode: 400,
                error: "Price per day is required and must be a number"
            })
        }
        let spot = await Spot.create({
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        })
        res.status(201).json(spot)
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})

router.post('/:spotId/images', async (req, res) => {
    const { user } = req
    const { url, preview } = req.body
    const { spotId } = req.params
    console.log(user)
    if (user) {
        let spots = await Spot.findByPk(spotId)
        if (spots !== null) {
            if(spots.ownerId === user.id){
            let spotImage = await SpotImage.create({
                spotId: parseInt(spotId),
                url: url,
                preview: preview,
            })
            console.log(spotImage)
            spotImage.dataValues.ownerId = parseInt(user.id)
            console.log(spotImage)
            res.json(
                {
                    id: spotImage.id,
                    url: spotImage.url,
                    preview: spotImage.preview
                })
            }
        } else return res.status(404).json({
            message: "spot couldn't be found",
            statusCode: 404
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})
router.put('/:spotId', async (req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { spotId } = req.params
    if (user) {
        const spots = await Spot.findByPk(spotId, {})
        if (spots !== null) {
            if (address) {
                spots.address = address
            }
            if (city) {
                spots.city = city
            }
            if (state) {
                spots.state = state
            }
            if (country) {
                spots.country = country
            }
            if (lat) {
                spots.lat = lat
            }
            if (lng) {
                spots.lng = lng
            }
            if (name) {
                spots.name = name
            }
            if (description) {
                spots.description = description
            }
            if (price) {
                spots.price = price
            }
            await spots.save()
            res.json(spots)
        } else return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})
module.exports = router;
