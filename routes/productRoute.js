const express = require('express');
const productController = require('../controllers/productController');

const routes = express.Router();


routes.get('/index', productController.index);

routes.post('/create', productController.createItem);

routes.put('/updatePrice', productController.updatePrice);

routes.put('/updateName', productController.updateName);

routes.delete('/delete', productController.deleteItem);

module.exports = routes