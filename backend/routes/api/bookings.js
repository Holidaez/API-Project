const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

router.get('/current', async (req,res)=>{
    const {user} = req
    let spot;
    if(user){
        const bookings = await Booking.findAll()
        for (let booking of bookings){
            let spots = await Spot.findAll({
                where: {ownerId:booking.userId},
                raw:true
            })
            for (spot of spots){
                let previewImages = await SpotImage.findAll({
                    where: {spotId: spot.id},
                    attributes:["url"],
                    raw:true
                })
                if(previewImages.length){
                    spot.previewImage = previewImages[0].url
                }
            }
            booking.dataValues.Spot = spot
        }
        res.json({
            Bookings:bookings
        })
    }else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})




module.exports = router;
