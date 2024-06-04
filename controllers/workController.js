const ApiError = require("../error/ApiError");
const { Works, Details, Statuses, FullServiceLists, Employees, Requests } = require('../models/models');

class WorkController {
    async create(req, res, next) {
        try {
            const { DetailVendorCode, StatusId, FullServiceListId, EmployeeId, RequestId } = req.body;
            const work = await Works.create({ DetailVendorCode, StatusId, FullServiceListId, EmployeeId, RequestId });
            res.json(work);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

async findAllWeb(req, res, next) {
    try {
        const works = await Works.findAll({
            include: [
                {
                    model: Details,
                    attributes: ['vendorCode', 'detailName']
                },
                {
                    model: Statuses,
                    attributes: ['id', 'name']
                },
                {
                    model: FullServiceLists,
                    attributes: ['id', 'name', 'price']
                },
                {
                    model: Employees,
                    attributes: ['id', 'name', 'surname']
                },
                {
                    model: Requests,
                    attributes: ['id', 'description']
                }
            ]
        });
        return res.json(works);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

    

    async findById(req, res, next) {
        try {
            const { id } = req.params;  // Ensure the parameter name matches the route
            const work = await Works.findOne({ where: { id } });  // Correct the condition to use 'id'
            if (!work) {
                return next(ApiError.notFound(`Work with id ${id} not found`));
            }
            return res.json(work);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { DetailVendorCode, StatusId, FullServiceListId, EmployeeId, RequestId } = req.body;
            const [updated] = await Works.update(
                { DetailVendorCode, StatusId, FullServiceListId, EmployeeId, RequestId },
                { where: { id } }
            );
            if (updated) {
                const updatedWork = await Works.findOne({ where: { id } });
                return res.json(updatedWork);
            }
            throw new Error(`Work with id ${id} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await Works.destroy({ where: { id } });
            if (deleted) {
                return res.json({ message: `Work with id ${id} deleted` });
            }
            throw new Error(`Work with id ${id} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new WorkController();
