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


const uri = process.env.ATLAS_URI;

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB database connection established successfully'))
    .catch(err => console.log(err));

const sellerRouter = require('./routes/Seller.routes');

app.use('/seller', sellerRouter);


app.listen(port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Server is running on port: ' + port);
});