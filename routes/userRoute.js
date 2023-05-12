const express = require('express');
const userController = require('../controllers/userController')

const routes = express.Router();

routes.get('/index', userController.index)

routes.post("/login",userController.login)

routes.post('/create',userController.createUser)


module.exports = routes