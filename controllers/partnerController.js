const ApiError = require("../error/ApiError");
const { Partners } = require('../models/models');

class partnerController {
    async create(req, res, next) {
        try {
            console.log(req.body);
            const { INN, shortName, fullName } = req.body;
            const status = await Partners.create({ INN, shortName, fullName });
            return res.json({ status });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next) {
        try {
            const partners = await Partners.findAll();
            return res.json(partners);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const partner = await Partners.findOne({ where: { id } });
            if (!partner) {
                return next(ApiError.notFound(`Partner with id ${id} not found`));
            }
            return res.json(partner);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { INN, shortName, fullName } = req.body;
            const [updated] = await Partners.update({ INN, shortName, fullName }, { where: { id } });
            if (updated) {
                const updatedPartner = await Partners.findOne({ where: { id } });
                return res.json({ partner: updatedPartner });
            }
            throw new Error(`Partner with id ${id} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Partners.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: `Partner with id ${id} deleted` });
            }
            throw new Error(`Partner with id ${id} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new partnerController
