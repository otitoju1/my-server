const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./index.routing');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 6000;

const uri = `mongodb+srv://${config.db_username}:${config.password}@${config.cluster}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next()
});

app.get("/", (_req, res) => {
    res.send(`<h1>Application server on ${PORT}`)
})

app.get("*", (_req, res) => {
    res.send(`<h1>Route not found on ${PORT}`)
})

try {
    app.listen(PORT, ()=> {
        console.log(`Application started on ${PORT}`);
        //DATABASE CONNECTION
        mongoose.connect(uri);
    })
} catch (error) {
    console.error(`Error occured: ${error.message}`);
}
