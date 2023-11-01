const express = require('express')
const nodemailer = require('nodemailer');
const controlers = require('../controlers/usersControlers')
const router = express.Router();

const {validateMessage,sendMessage} = controlers



router.post('/Message',validateMessage, sendMessage)





module.exports = router;