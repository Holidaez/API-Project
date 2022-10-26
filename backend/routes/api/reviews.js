const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models');
const spot = require('../../db/models/spot');
const router = express.Router();

//! Get all reviews for a current USER
router.get('/current', async (req, res) => {
    const { user } = req
    let spot;
    if (user) {
        let reviews = await Review.findAll({
            where: { userId: user.id },
        })
        // Adds each individual thing to Reviews
        for (let review of reviews) {
            let users = await User.findAll({
                where: { id: review.userId },
                attributes: ["id", "firstName", "lastName"],
                raw: true
            })
            let spots = await Spot.findAll({
                where: { id: review.spotId },
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price",],
                raw: true
            })
            //Adds preview image to Each spot
            for (spot of spots) {
                let previewImages = await SpotImage.findAll({
                    where: { spotId: spot.id },
                    attributes: ["url"],
                    raw: true
                })
                if (previewImages.length) {

                    spot.previewImage = previewImages[0].url

                }
                console.log(spot)
            }
            console.log(review.id)
            let reviewImages = await ReviewImage.findAll({
                where: { reviewId: review.id },
                attributes: ["id", "url"],
                raw: true
            })
            console.log(reviewImages.reviewId)
            console.log(reviewImages)
            review.dataValues.User = users[0]
            review.dataValues.Spot = spot
            review.dataValues.ReviewImages = reviewImages
        }
        res.json({
            Reviews: reviews
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})

router.post('/:reviewId/images', async (req, res) => {
    const { user } = req
    const { reviewId } = req.params
    const { url } = req.body
    if (user) {
        let reviews = await Review.findByPk(reviewId)
        if (reviews !== null) {
            console.log(reviews.userId)
            if (reviews.userId === user.id) {
                let reviewImage = await ReviewImage.create({
                    reviewId: parseInt(reviewId),
                    url: url
                })
                reviewImage.dataValues.ownerId = parseInt(user.id)
                res.json({
                    id: reviewImage.id,
                    url: reviewImage.url
                })
            }
        } else return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})

router.put('/:reviewId', async (req, res) => {
    const { user } = req
    const { reviewId } = req.params
    const { review, stars } = req.body
    if (user) {
        const reviews = await Review.findByPk(reviewId, {})
        if (reviews !== null) {
        if (reviews.userId !== user.id) {
            return res.status(401).json({
                "message": "Authentication required",
                "statusCode": 401
            });

        }
            if (review !== null) {
                reviews.review = review
            }
            if (stars !== null) {
                reviews.stars = stars
            }
            await reviews.save()
            res.json(reviews)
        } else return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})


module.exports = router;
