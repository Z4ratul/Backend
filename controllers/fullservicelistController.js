const ApiError = require("../error/ApiError")
const {FullServiceLists} = require('../models/models')

class FullServiceListController{
    async create(req, res, next){
        try {
            console.log(req.body)
            const { name, price } = req.body;
            const fullServiceList = await FullServiceLists.create({ name, price });
            return res.json({ fullServiceList });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next){
        try {
            const fullServiceLists = await FullServiceLists.findAll()
            return res.json(fullServiceLists)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next){

    }
}

module.exports = new FullServiceListController