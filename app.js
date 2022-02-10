const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./index.routing');
//const routes from './index.routing'
const app = express();
const PORT = 6000;
const username = "otitoju";
const password = "abcd1234";
const cluster = "cluster0.joqfv";
const dbname = "data_collections";
const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes)

try {
    app.listen(PORT, ()=> {
        console.log(`Application started on ${PORT}`);
        //DATABASE CONNECTION
        mongoose.connect(uri);
    })
} catch (error) {
    console.error(`Error occured: ${error.message}`);
}
