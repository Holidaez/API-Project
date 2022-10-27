const express = require('express');
const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

router.get('/current', async (req, res) => {
    const { user } = req
    let spot;
    if (user) {
        const bookings = await Booking.findAll()
        for (let booking of bookings) {
            let spots = await Spot.findAll({
                where: { ownerId: booking.userId },
                raw: true
            })
            for (spot of spots) {
                let previewImages = await SpotImage.findAll({
                    where: { spotId: spot.id },
                    attributes: ["url"],
                    raw: true
                })
                if (previewImages.length) {
                    spot.previewImage = previewImages[0].url
                }
            }
            booking.dataValues.Spot = spot
        }
        res.json({
            Bookings: bookings
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})

//! Edit a booking
router.put('/:bookingId', async (req, res) => {
    const { user } = req
    const { bookingId } = req.params
    const { startDate, endDate } = req.body
    if (user) {
        const bookings = await Booking.findByPk(bookingId)

        if (bookings !== null) {
            if (bookings.userId !== user.id) {
                return res.status(401).json({
                    "message": "Authentication required",
                    "statusCode": 401
                });
            }
            let date1 = new Date(startDate).getTime()

            let date2 = new Date(endDate).getTime()

            let currentDate = new Date().getTime()

            if (currentDate - date1 >= 0 || currentDate - date2 >= 0) {
                return res.status(403).json({
                    message: "Past bookings can't be modified",
                    statusCode: 403
                })
            }
            if (date2 - date1 <= 0) {
                return res.status(400).json({
                    message: "Validation Error",
                    statusCode: 400,
                    errors: {
                        endDate: "endDate cannot come before startDate"
                    }
                })
            }
            console.log(bookings.spotId)
            const allBookings = await Booking.findAll({
                where: { spotId: bookings.spotId }
            })
            for (let booking of allBookings) {
                if (booking.startDate.getTime() === date1 || booking.endDate.getTime() === date2) {
                    return res.status(403).json({
                        message: "Sorry, this spot is already booked for the specified dates",
                        statusCode: 403,
                        errors: {
                            startDate: "Start date conflicts with an existing booking",
                            endDate: "End date conflicts with an existing booking"
                        }
                    })
                }
            }
            if (!startDate) {
                res.status(400).json({
                    message: 'Validation Error',
                    statusCode: 400,
                    error: "StartDate is invalid"
                })
            } else {
                bookings.startDate = startDate
            }
            if (!endDate) {
                res.status(400).json({
                    message: 'Validation Error',
                    statusCode: 400,
                    error: "endDate is invalid"
                })
            } else {
                bookings.endDate = endDate
            }
            await bookings.save()
            res.json(bookings)
        } else return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})

//! DELETE A BOOKING

router.delete('/:bookingId', async (req, res)=>{
    const {user} = req
    const {bookingId} = req.params
    if (user){
        const bookings = await Booking.findByPk(bookingId,{})
        if (bookings !== null) {
            if (bookings.userId !== user.id){
                return res.status(403).json({
                    "message": "Authentication required",
                    "statusCode": 403
                });
            }
            const date1 = new Date(bookings.startDate).getTime()
            const date2 = new Date(bookings.endDate).getTime()
            const currentDate = new Date()
            if(currentDate > date1 || currentDate > date2){
                res.status(403).json({
                    message:"Bookings that have been started can't be deleted",
                    statusCode:403
                })
            }
            await bookings.destroy()
            res.status(200).json({
                message: "Successfully deleted",
                statusCode:200
            })
        }else return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });
})






module.exports = router;
