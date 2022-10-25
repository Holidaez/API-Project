const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');




module.exports = router;
