const ApiError = require("../error/ApiError")
const {Details} = require('../models/models')

class DetailController{
    async create(req, res, next){
        try {
            console.log(req.body)
            const { vendorCode, detailName, QTY, price } = req.body;
            const detail = await Details.create({ vendorCode, detailName, QTY, price });
            return res.json({ detail });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next){
        try {
            const details = await Details.findAll()
            return res.json(details)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next){

    }
}

module.exports = new DetailController