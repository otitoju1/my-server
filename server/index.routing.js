const express = require('express');
const router = express.Router();
const UserController = require('./controllers/user.controller');


router.post('/api/v1/create', UserController.createUser);
router.post('/api/v1/login', UserController.loginUser);
router.get('/api/v1/qrcode', UserController.getQrCode);
router.get('/api/v1/users', UserController.getUsers);
router.get('/api/v1/user/:id', UserController.getUser)

// https://cloud.mongodb.com/v2/62048ffbb6912523f1c33de9#clusters

module.exports = router;