const express = require('express')
const Wine = require('../schemas/Wine')
const controlers = require('../controlers/productsControlers')
const router = express.Router();

const {getWinesData, postNewItem,modulate,filterWines,getKnowData,getExclusiveData,getItem} = controlers

router.get('/Shop',getWinesData)

router.get('/Know',getKnowData)

router.get('/Exclusive',getExclusiveData)

router.post('/Add',modulate, postNewItem)

router.get('/Filter',  filterWines)

router.get('/Buy/:wine',getItem)



module.exports = router;