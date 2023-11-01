const express = require('express')
const bodyParser = require('body-parser');
const products = require('./routes/products')
const users = require('./routes/users')
const mongoose = require('mongoose');
const Wine = require('./schemas/Wine')
const app = express()
mongoose.connect("mongodb+srv://Santier30:VintusTM@vintus.rseaz50.mongodb.net/Vintus").then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

//   async function run(){
//     try {    
    
//     const wine = new Wine({name:"Romanée Conti"})
//     const res = await wine.save()
//     console.log(res.message)
   
        
//     } catch (error) {
//         console.log(error.message)
//     }

//   }
//   run();
  
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/Vintus/Products', products)
app.use('/Vintus/Users', users)
app.listen(5000,()=> console.log('listening on port5000...'));