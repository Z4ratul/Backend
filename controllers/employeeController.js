const ApiError = require("../error/ApiError")
const {Employees} = require('../models/models')
const bcrypt = require('bcrypt')

class EmployeeController{
    async create(req,res,next){
        try{
            const {surname, name, patronymic, telephone, email, login, password, PositionId} = req.body
            const hashPassword = await bcrypt.hash(password,5)
            const employee = await Employees.create({ surname, name, patronymic, telephone, email, login, password: hashPassword, PositionId})
            return res.json(employee)
        }
        catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;
    
            // Проверка на наличие логина и пароля в запросе
            if (!login || !password) {
                return next(ApiError.badRequest('Логин и пароль обязательны'));
            }
    
            const employee = await Employees.findOne({ where: { login } });
    
            if (!employee) {
                return next(ApiError.internal('Пользователь не найден'));
            }
    
            const comparePassword = bcrypt.compareSync(password, employee.password);
    
            if (!comparePassword) {
                return next(ApiError.internal('Неверный пароль'));
            }
    
            const { id, surname, name, patronymic } = employee;
    
            const responseData = {
                id,
                surname,
                name,
                patronymic,
            };
    
            return res.json(responseData);
        } catch (e) {
            // Логирование ошибки и отправка корректного ответа с ошибкой
            console.error(e);
            return next(ApiError.badRequest(e.message));
        }
    }

async findAll(req, res, next) {
try {
const employees = await Employees.findAll({
include: [{
model: Position,
attributes: ['id', 'name'] // Specify the fields you want to include from the Position table
}]
});
return res.json(employees);
} catch (e) {
next(ApiError.badRequest(e.message));
}
}

    async findById(req, res, next){

    }
}

module.exports = new EmployeeController
