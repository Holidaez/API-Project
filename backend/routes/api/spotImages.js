const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const spot = require('../../db/models/spot');
const router = express.Router();

router.delete('/:imageId', async (req, res)=>{
    const {user} = req
    const {imageId} = req.params
    if(user){
        let images = await SpotImage.findByPk(imageId)
        if(images !== null){
            await images.destroy()
            res.status(200).json({
                message: "Successfully deleted",
                statusCode:200
            })
        }else return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})



module.exports = router;
