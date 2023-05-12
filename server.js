const express = require('express');
require('dotenv').config()

const cors = require('cors');
//configuração basica
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000


const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const buyRoute = require('./routes/buyRoute')
const sellRoute = require('./routes/sellRoute')


app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/buy', buyRoute)
app.use('/sell', sellRoute)








app.listen(PORT,()=> console.log('Server is running 🚀'))