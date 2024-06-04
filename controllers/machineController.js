const ApiError = require("../error/ApiError");
const { Machines } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class MachineController {
    async create(req, res, next) {
        try {
            const { VINNumber, modelName, serialNumber, dateOfManufacture, ManufacturerId, MachineTypeId, PartnerId } = req.body;
            const { image } = req.files;
            let imageName = uuid.v4() + ".png";
            image.mv(path.resolve(__dirname, '..', 'static', imageName));
            const machine = await Machines.create({ VINNumber, modelName, serialNumber, dateOfManufacture, image: imageName, ManufacturerId, MachineTypeId, PartnerId });
            return res.json({ machine });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next) {
        try {
            const { PartnerId } = req.params;
            let machines;
            if (PartnerId) {
                machines = await Machines.findAll({ where: { PartnerId } });
            } else {
                machines = await Machines.findAll();
            }
            return res.json(machines);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAllWeb(req, res, next) {
        try {
            const machines = await Machines.findAll({
                include: [
                    {
                        model: Manufacturers,
                        attributes: ['id', 'name'],
                        as: 'Manufacturer'
                    },
                    {
                        model: MachineTypes,
                        attributes: ['id', 'name'],
                        as: 'MachineType'
                    },
                    {
                        model: Partners,
                        attributes: ['id', 'shortName'],
                        as: 'Partner'
                    }
                ]
            });
            return res.json(machines);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    

    async findById(req, res, next) {
        try {
            const { VINNumber } = req.params;
            const machine = await Machines.findOne({ where: { VINNumber } });
            return res.json(machine);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { VINNumber } = req.params;
            const { modelName, serialNumber, dateOfManufacture, ManufacturerId, MachineTypeId, PartnerId } = req.body;
            let updateData = { modelName, serialNumber, dateOfManufacture, ManufacturerId, MachineTypeId, PartnerId };
            
            if (req.files && req.files.image) {
                const { image } = req.files;
                let imageName = uuid.v4() + ".png";
                image.mv(path.resolve(__dirname, '..', 'static', imageName));
                updateData.image = imageName;
            }

            const [updated] = await Machines.update(updateData, { where: { VINNumber } });
            if (updated) {
                const updatedMachine = await Machines.findOne({ where: { VINNumber } });
                return res.json(updatedMachine);
            }
            throw new Error(`Machine with VINNumber ${VINNumber} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { VINNumber } = req.params;
            const deleted = await Machines.destroy({ where: { VINNumber } });
            if (deleted) {
                return res.json({ message: `Machine with VINNumber ${VINNumber} deleted` });
            }
            throw new Error(`Machine with VINNumber ${VINNumber} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new MachineController;
