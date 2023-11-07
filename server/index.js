const express = require('express')
const bodyParser = require('body-parser');
const products = require('./routes/products')
const users = require('./routes/users')
const mongoose = require('mongoose');
const Wine = require('./schemas/Wine')
const Users = require('./schemas/User')
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express()
mongoose.connect("mongodb+srv://Santier30:VintusTM@vintus.rseaz50.mongodb.net/Vintus").then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

  mercadopago.configure({
    access_token: "TEST-4586980718908238-110701-1040fa2a3694bc34200b4b4b8b3d7e43-1539628910",
  });

 
 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/Vintus/Products', products)
app.use('/Vintus/Users', users)
app.use('/Vintus/create_preference', (req, res) => {
console.log('dhsfjhsdfjhjsdhf')
	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: 1,
			}
		],
		back_urls: {
			"success": "http://localhost:5000/Vintus/feedback",
			"failure": "http://localhost:3000",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/Vintus/feedback', function (req, res) {
	console.log(req.query)
  res.redirect('http://localhost:3000/Vintus');
});
app.listen(5000,()=> console.log('listening on port5000...'));