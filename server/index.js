const express = require('express')
const bodyParser = require('body-parser');
const products = require('./routes/products')
const users = require('./routes/users')
const mongoose = require('mongoose');
const Wine = require('./schemas/Wine')
const Users = require('./schemas/User')
const cors = require("cors");
const mercadopago = require("mercadopago");
const nodemailer = require('nodemailer');
const { DateTime } = require("luxon");


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
app.use('/Vintus/create_preference', async(req, res) => {
console.log(req.body)
const user = await Users.findOne({email:req.body.email,apiKey:req.body.apiKey},{ password: 0 });
const transporter = nodemailer.createTransport({
	service: 'Gmail', 
	auth: {
		user: 'VintusTm@gmail.com',
		pass: 'orao eoqs ooji qibw',
	},
});



const clientMail = {
	from: 'VintusTm@gmail.com',
	to: req.body.email,
	subject: `Vintus Gracias por su Compra`,
	text: `
Gracias por su compra 
	`,
}


await transporter.sendMail(clientMail);
	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: 1,
			}
		],
		back_urls: {
			"success": `http://localhost:5000/Vintus/feedback?email=${req.body.email}`,
			"failure": "http://localhost:3000",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(async function (response) {
			let data = req.body.buy
			data.status = "No verificado";
			data.date = DateTime.now().setZone("America/Argentina/Buenos_Aires");
			data.idT = response.body.id
			user.buys=user.buys[0]?[...user.buys,data]:[data];
			console.log('dhsfjhsdfjhjsdhf')
			console.log(data.date)
			const a = await user.save();

			res.json({
				url: response.body.init_point,
				user:a
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.use('/Vintus/feedback', async function (req, res) {//No Puedo Usar webHooks en local storage
	console.log(req.query.email)

	const filter = { email: req.query.email, 'buys.idT': req.query.preference_id };
  

	const update = { $set: { 'buys.$.status': 'Pagado' } };
  

	const updatedUser = await Users.findOneAndUpdate(filter, update, { new: true });
	

  res.redirect('http://localhost:3000/Vintus');
});
app.listen(5000,()=> console.log('listening on port5000...'));