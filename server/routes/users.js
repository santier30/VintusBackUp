const express = require('express')
const nodemailer = require('nodemailer');
const controlers = require('../controlers/usersControlers')
const router = express.Router();
const Users = require('../schemas/User')
const {validateMessage,sendMessage,singUp,logIn} = controlers



router.post('/Message',validateMessage, sendMessage)

router.post('/SingUp',singUp)

router.post('/Login',logIn)

router.post('/Update',async(req,res)=>{
    const data = req.body;
        console.log(data);
      try {
        const user = await Users.findOne({email:data.email,password:data.password});
        console.log(user);
        user.email=data.newEmail;
        user.name=data.name;
        user.dni=data.dni;
        user.sex=data.sex;
        user.birth=data.birth;
        user.phone=data.phone;
        user.apartment=data.apartment;
        const resp =  await user.save()
     if (resp){res.status(200).json(resp);}else{throw new Error("Email o contrasena incorrecta")}
      } catch (error) {
        console.log(error.message);
        res.status(500).json(error);
      }
})

router.post('/Address',async(req,res)=>{
  const data = req.body;
      console.log(data);
    try {
      const user = await Users.findOne({email:data.email,password:data.password});
      console.log(user);
      user.address=user.address[0]?[...user.address,data.address]:[data.address];

      const resp =  await user.save()
   if (resp){res.status(200).json(resp);}else{throw new Error("Email o contrasena incorrecta")}
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
})

router.delete('/Delete/:addressId', async(req, res) => {
  const apiKey = req.headers.authorization; 
  const email = req.headers['x-user-email']; 
  const addressId = req.params.addressId; 

  try {
    const updatedUser = await Users.findOneAndUpdate(
      { email: email,password: apiKey},
      { $pull: { address: { _id: addressId } } },
      { new: true }
    ).exec();
  
    if (updatedUser) {

      console.log(updatedUser);
    } else {

      console.log("User or address not found");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
   
    res.status(403).json({ message: 'Address deletion failed or unauthorized' });
  }
});





module.exports = router;