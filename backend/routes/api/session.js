const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];
//TODO Restores a session for a user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json(
          user.toSafeObject()
        );
      } else return res.status(401).json({
        "message": "Authentication required",
        "statusCode": 401
      });
    }
  );
  //TODO END SESSION RESTORATION
//! LOGIN ROUTE
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);
    return res.json({
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      username:user.username,
      token:""
    });
  }
);
//! END LOGIN ROUTE
//? LOGOUT ROUTE
  //Removes the token cookie
  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );
//? END LOGOUT ROUTE






//test
module.exports = router;
