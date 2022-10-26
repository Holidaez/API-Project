const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('firstName')
    .exists({checkFalsy: true})
    .isLength({min:1})
    .withMessage('First Name is required'),
    check('lastName')
    .exists({checkFalsy:true})
    .isLength({min:1})
    .withMessage('Last Name is required'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    try{
      const user = await User.signup({ firstName, lastName, email, username, password });
      await setTokenCookie(res, user);
      return res.json({
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        username:user.username
      });
    }catch (error){
      res.status(403).json({
        // message:'user already exists',
        statusCode:403,
        errors:error.errors[0].message
      })
    }
  }
);
//test
module.exports = router;
