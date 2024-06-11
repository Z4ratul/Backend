const ApiError = require("../error/ApiError")
const {Requests, Machines, Partners, ServiceLists} = require('../models/models')

class RequestController{

    //Для тестовых и конкретных записей
    async create(req,res,next){
        try{
            const {openDate, closeDate, description, MachineVINNumber, PartnerId, ServiceListId} = req.body
            const request = await Requests.create({openDate, closeDate, description, MachineVINNumber, PartnerId, ServiceListId})
            return res.json(request)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
    async createAll(req, res, next) {
        try {
            const { description, PartnerId, MachineVINNumber, ServiceListId } = req.body;
            
            // Проверка обязательных параметров
            if (!description || !PartnerId || !MachineVINNumber || !ServiceListId) {
                throw new Error('Не все обязательные поля заполнены');
            }
    
            const openDate = new Date(); // Текущая дата и время
            const closeDate = null; // Значение по умолчанию для EndDate
            openDate.setHours(0, 0, 0, 0);
            
            // Создание заявки с использованием обработки ошибок и асинхронного ожидания
            const request = await Requests.create({ openDate, closeDate, description, PartnerId, MachineVINNumber, ServiceListId });
            
            // Проверка успешного создания заявки и отправка ответа
            if (request) {
                return res.json(request);
            } else {
                throw new Error('Не удалось создать заявку');
            }     
        } catch (e) {
            // Обработка ошибок и отправка ответа с сообщением об ошибке
            next(ApiError.badRequest(e.message));
        }
    }
    

    async findAll(req, res, next) {
        try {
            const { PartnerId } = req.params;
            let requests;
            if (PartnerId) {
                requests = await Requests.findAll({
                    where: {
                        PartnerId: PartnerId
                    },
                    include: [
                        {
                            model: Machines,
                            attributes: ['VINNumber', 'modelName']
                        },
                        {
                            model: Partners,
                            attributes: ['id', 'shortName']
                        },
                        {
                            model: ServiceLists,
                            attributes: ['id', 'name']
                        }
                    ]
                });
            } else {
                requests = await Requests.findAll({
                    include: [
                        {
                            model: Machines,
                            attributes: ['VINNumber', 'modelName']
                        },
                                                {
                            model: Partners,
                            attributes: ['id', 'shortName']
                        },
                        {
                            model: ServiceLists,
                            attributes: ['id', 'name']
                        }
                    ]
                });
            }
    
            return res.json(requests);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    

async findAllWeb(req, res, next) {
    try {
        const requests = await Requests.findAll({
            include: [
                {
                    model: Machines,
                    attributes: ['VINNumber', 'modelName']
                },
                                        {
                            model: Partners,
                            attributes: ['id', 'shortName']
                        },
                {
                    model: ServiceLists,
                    attributes: ['id', 'name']
                }
            ]
        });
        return res.json(requests);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

    

async getAllActive(req, res, next) {
    try {
        const { PartnerId } = req.params;
        const requests = await Requests.findAll({
            where: {
                closeDate: null,
                PartnerId: PartnerId
            },
            include: [
                {
                    model: Machines,
                    attributes: ['VINNumber', 'modelName']
                },
                {
                    model: ServiceLists,
                    attributes: ['id', 'name']
                }
            ]
        });
        return res.json(requests);
    } catch (e) {
        next(ApiError.badRequest(e.message));
    }
}

}

module.exports = new RequestController
