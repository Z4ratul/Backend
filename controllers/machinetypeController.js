const ApiError = require("../error/ApiError");
const { MachineTypes } = require('../models/models');

class MachineTypeController {
    async create(req, res, next) {
        try {
            console.log(req.body);
            const { name } = req.body;
            const machinetype = await MachineTypes.create({ name });
            return res.json({ machinetype });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next) {
        try {
            const machinetypes = await MachineTypes.findAll();
            return res.json(machinetypes);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const machinetype = await MachineTypes.findOne({ where: { id } });
            if (!machinetype) {
                return next(ApiError.badRequest('Machine type not found'));
            }
            return res.json(machinetype);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new MachineTypeController();
