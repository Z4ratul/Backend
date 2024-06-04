const ApiError = require("../error/ApiError");
const { ServiceLists } = require('../models/models');

class ServiceListController {
    async create(req, res, next) {
        try {
            console.log(req.body);
            const { name } = req.body;
            const serviceList = await ServiceLists.create({ name });
            return res.json({ serviceList });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next) {
        try {
            const serviceLists = await ServiceLists.findAll();
            return res.json(serviceLists);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const serviceList = await ServiceLists.findOne({ where: { id } });
            if (!serviceList) {
                return next(ApiError.badRequest('Service list not found'));
            }
            return res.json(serviceList);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ServiceListController();
