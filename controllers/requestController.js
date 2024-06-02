const ApiError = require("../error/ApiError")
const {Requests} = require('../models/models')

class RequestController{

    //Для тестовых и конкретных записей
    async create(req,res,next){
        try{
            const {openDate, endDate, description, MachineVINNumber, PartnerId, ServiceListId} = req.body
            const request = await Requests.create({openDate, endDate, description, MachineVINNumber, PartnerId, ServiceListId})
            return res.json(request)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
        // Все остальные запросы
    async createAll(req, res, next) {
        try {
            const { description, PartnerId, MachineVINNumber, ServiceListId} = req.body;
            const openDate = new Date(); // Текущая дата и время
            const endDate = null; // Значение по умолчанию для EndDate
            openDate.setHours(0, 0, 0, 0);
            const request = await Requests.create({ openDate, endDate, description, PartnerId, MachineVINNumber, ServiceListId });
            return res.json(request)          
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next){
        try{
            const {id} = req.params;
            let requests
            if(id){
                requests = await Requests.findAll({
                    where: {
                        PartnerId:id
                    }
                });
            }else{
                requests = await Requests.findAll();
            }

            return res.json(requests)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllActive(req, res, next) {
        try {
            const {id} = req.params;
            const requests = await Requests.findAll({
                where: {
                    EndDate: null,
                    PartnerId:id
                }
            });
            return res.json(requests);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RequestController