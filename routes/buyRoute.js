const express = require('express');
const buyController = require('../controllers/buyController');

const route = express.Router()

route.get('/index', buyController.index)
route.post('/create', buyController.createBuy)


module.exports = route