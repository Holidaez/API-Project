const express = require('express');
const { User, Spot, Review } = require('../../db/models');
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
        res.json(spot)
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})

router.post('/:spotId/images', async (req, res) => {
    const { user } = req
    const { url, preview } = req.params
    if (user) {

    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})

module.exports = router;
