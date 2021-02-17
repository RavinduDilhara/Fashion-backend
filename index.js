const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/FashionDB',
    {
        useNewUrlParser: true,
        useFindAndModify: false
    },(err)=>{
        if (err){
            process.exit(1);
            console.log('unable to connect database.');
        }
        else{
            console.log('successfully connect database.')
        }
    })

const sellerRouter = require('./routes/Seller.routes');
const adminLoginRouter = require('./routes/AdminLogin.routes');
const categoryRouter = require('./routes/Category.routes');

app.use('/seller', sellerRouter);
app.use('/admin', adminLoginRouter);
app.use('/category', categoryRouter);

app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Server is running on port: ' + port);
});