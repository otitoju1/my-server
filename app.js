const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index.js')
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
//PORT
const port = process.env.PORT || 6000;
app.listen(port,() =>{
    console.log(`App is listening to ${port}`)
})
app.get('*', (req,res) => {
    res.json(`404 ERROR, PAGE NOT FOUND`)
})
//DATABASE CONNECTION
const username = "otitoju";
const password = "abcd1234";
const cluster = "cluster0.joqfv";
const dbname = "data_collections";
const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri);