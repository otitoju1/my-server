const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    photo: String,
    ingredient: String,
    method: String,
    date: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('recipes', recipeSchema);
