const ApiError = require("../error/ApiError")
const {Manufacturers} = require('../models/models')

class ManufacturerController{
    async create(req, res, next){
        try {
            console.log(req.body)
            const { name } = req.body;
            const manufacturer = await Manufacturers.create({ name });
            return res.json({ manufacturer });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next){
        try {
            const manufacturers = await Manufacturers.findAll()
            return res.json(manufacturers)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next){

    }
}

module.exports = new ManufacturerController