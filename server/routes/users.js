const express = require('express')
const nodemailer = require('nodemailer');
const controlers = require('../controlers/usersControlers')
const router = express.Router();
// const Users = require('../schemas/User')
const {validateMessage,sendMessage,singUp,logIn} = controlers



router.post('/Message',validateMessage, sendMessage)

router.post('/SingUp',singUp)

router.post('/Login',logIn)




module.exports = router;