const ApiError = require("../error/ApiError")
const {Positions} = require('../models/models')

class PositionController{
    async create(req, res, next){
        try {
            console.log(req.body)
            const { name } = req.body;
            const position = await Positions.create({ name });
            return res.json({ position });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next){
        try {
            const positions = await Positions.findAll()
            return res.json(positions)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next){

    }
}

module.exports = new PositionController