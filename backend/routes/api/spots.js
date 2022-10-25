const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//Returns all spots
router.get('/', async (req,res)=>{
    const spots = await Spot.findAll()
    res.json({
        Spots:spots
    })
})
//Returns the Spots for whoever is logged in
router.get('/current', async (req,res)=>{
    const {user} = req;
    console.log(user)
    if(user) {
        let spots = await Spot.findAll({
            where: ownerId = user.id
        })
        res.json({
            Spots:spots
        })
    }else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
    });

})

//! Get details of a Spot from an Id
router.get('/:spotId', async (req,res)=>{
    const {spotId} = req.params
    let spots = await Spot.findByPk(spotId,{})
    if(spots === null){
        return res.status(404).json({
            message:"Spot couldn't be found",
            statusCode:404
        })
    }
    res.json(
        spots
    )
})
module.exports = router;
