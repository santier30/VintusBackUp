const express = require('express')
const bodyParser = require('body-parser');
const products = require('./routes/products')
const users = require('./routes/users')
const mongoose = require('mongoose');
const Wine = require('./schemas/Wine')
const Users = require('./schemas/User')
const fileUpload = require('express-fileupload');

const app = express()
mongoose.connect("mongodb+srv://Santier30:VintusTM@vintus.rseaz50.mongodb.net/Vintus").then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

  // async function run(){
  //   const data = req.body
    // try {    

    // const updatedUser = await Users.findOneAndUpdate(
    //   { _id: "65432969f64fd899c7148685" },
    //   { $pull: { address: { _id: "654586389a6be14b788d6b4a" } } },
    //   { new: true }
    // ).exec();
  
    // if (updatedUser) {

    //   console.log(updatedUser);
    // } else {

    //   console.log("User or address not found");
    // }
        
    // } catch (error) {
    //     console.log(error.message)
    // }

  // }
  // setTimeout( ()=>{run()},2000)
 
  
app.use(express.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Vintus/Products', products)
app.use('/Vintus/Users', users)
app.listen(5000,()=> console.log('listening on port5000...'));