const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./index.routing')
const cors = require("cors");
const config = require('./config');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', routes)
//PORT
const port = process.env.PORT || 7000;
app.listen(port,() =>{
    console.log(`Application is listening to ${port}`)
})
app.get('*', (req,res) => {
    res.json(`404 ERROR, PAGE NOT FOUND`)
})
//DATABASE CONNECTION
const uri = `mongodb+srv://${config.db_username}:${config.password}@${config.cluster}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
mongoose.connect(uri);
