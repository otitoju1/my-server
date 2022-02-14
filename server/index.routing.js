const express = require('express');
const router = express.Router();
const UserController = require('./controllers/user.controller');
const RecipeController = require('./controllers/recipe.controller');

router.post('/api/v1/create', UserController.createUser);
router.post('/api/v1/login', UserController.loginUser);
router.get('/api/v1/qrcode', UserController.getQrCode);
router.get('/api/v1/users', UserController.getUsers);
router.get('/api/v1/user/:id', UserController.getUser)
router.put('/api/v1/user/:id', UserController.updateUser)
router.delete('/api/v1/user/:id', UserController.deleteUser)

router.post('/api/v1/recipe/create', RecipeController.createRecipe);
router.get('/api/v1/recipes', RecipeController.getRecipes);
router.delete('/api/v1/recipe/:id', RecipeController.deleteRecipe);
router.get('/api/v1/recipe/:id', RecipeController.getRecipe)
router.put('/api/v1/recipe/:id', RecipeController.updateRecipe)

// https://cloud.mongodb.com/v2/62048ffbb6912523f1c33de9#clusters

module.exports = router;