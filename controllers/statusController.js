const ApiError = require("../error/ApiError")
const {Statuses} = require('../models/models')

class StatusController{
    async create(req, res, next){
        try {
            console.log(req.body)
            const { name } = req.body;
            const status = await Statuses.create({ name });
            return res.json({ status });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next){
        try {
            const statuses = await Statuses.findAll()
            return res.json(statuses)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next){
        try{
            const {statusId} = req.params
            const machinetype = await Statuses.findOne({where:{statusId}})
            return res.json(machinetype)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new StatusController