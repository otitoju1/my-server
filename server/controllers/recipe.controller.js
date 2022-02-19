const Recipe = require('../model/recipe');
const RecipeService = require('../service/http.service');

class RecipeController {

    static async createRecipe(req, res) {
        try {
            const { name, ingredient, photo, method } = req.body
            if(!name && !ingredient && !photo && !method) {
                return res.status(401).json({
                    message: 'INVALID'
                });
            }
            else {
                const info = await RecipeService.post(req.body, Recipe);
                return res.status(201).json({
                    info: info,
                    message: "created"
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    static async getRecipes(_req, res) {
        try {
            const info = await RecipeService.get(Recipe);
            return res.status(200).json({
                info: info
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async getRecipe(req, res) {
        try {
            let { id } = req.params
            const info = await RecipeService.get(Recipe, id);
            if(!info) {
                return res.status(404).json({
                    message: "Not found"
                })
            }
            return res.status(200).json({
                info: info
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteRecipe(req, res) {
        try {
            let { id } = req.params
            const info = await RecipeService.delete(Recipe, id);
            if(!info) {
                return res.status(404).json({
                    message: "Not found"
                })
            }
            return res.status(200).json({
                message: "deleted"
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateRecipe(req, res) {
        let { id } = req.params
        const info = await RecipeService.put(Recipe, id);
        try {
            if(!info) {
                return res.status(404).json({
                    message: "Not found"
                })
            }
            info.name = req.body.name || info.name
            info.photo = req.body.photo || info.photo
            info.ingredient = req.body.ingredient || info.ingredient
            info.method = req.body.method || info.method
            await info.save()
            return res.status(200).json({
                info: info,
                message: 'successful'
            })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = RecipeController;

