const express = require('express');
const sellController = require('../controllers/sellController')

const route = express.Router();

route.get('/index', sellController.index);
//route.post('/create', sellController.createSell);


module.exports = route