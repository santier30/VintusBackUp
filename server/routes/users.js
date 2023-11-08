const express = require('express')
const nodemailer = require('nodemailer');
const controlers = require('../controlers/usersControlers')
const router = express.Router();
const Users = require('../schemas/User')
const {validateMessage,sendMessage,singUp,logIn} = controlers



router.post('/Message',validateMessage, sendMessage)

router.post('/SingUp',singUp)

router.post('/Login',logIn)

router.post('/Check',async(req,res)=>{
  const data = req.body;
  console.log(data);
try {
  const user = await Users.findOne(data,{ password: 0 },);
  console.log(user);
if (user){res.status(200).json(user);}else{throw new Error("Email o contrasena incorrecta")}
} catch (error) {
  console.log(error.message);
  res.status(500).json(error);
}


})

router.post('/Update',async(req,res)=>{
    const data = req.body;
        console.log(data);
      try {
        const user = await Users.findOne({email:data.email,apiKey:data.apiKey},{ password: 0 });
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
      const user = await Users.findOne({email:data.email,apiKey:data.apiKey},{ password: 0 });
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
console.log(apiKey)
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { email: email,apiKey: apiKey},
      { $pull: { address: { _id: addressId } } },
      { projection: { password: 0 },
        new: true 
      }
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
router.post('/Password',async(req,res)=>{
  const data = req.body;
      console.log(data);
    try {
      const user = await Users.findOne({email:data.email,apiKey:data.apiKey,password:data.password});
      console.log(user);
      user.password=data.newPassword;
      const resp =  await user.save()
      const userWithoutPassword = await Users.findById(resp._id, { password: 0 })
   if (userWithoutPassword){res.status(200).json(userWithoutPassword);}else{throw new Error("Email o contrasena incorrecta")}
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error);
    }
})

// router.post('/Pay', (req, res) => {

// })




module.exports = router;