const express = require('express')
const nodemailer = require('nodemailer');
const controlers = require('../controlers/usersControlers')
const router = express.Router();
const Users = require('../schemas/User')
const {validateMessage,sendMessage,singUp,logIn,check,update,addAddress,deleteAddress,changePassword} = controlers



router.post('/Message',validateMessage, sendMessage)

router.post('/SingUp',singUp)

router.post('/Login',logIn)

router.post('/Check',check)

router.post('/Update',update)

router.post('/Address',addAddress)

router.delete('/Delete/:addressId', deleteAddress);
router.post('/Password',changePassword)






module.exports = router;