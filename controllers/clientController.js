const ApiError = require("../error/ApiError");
const { Clients, Partners } = require('../models/models');
const bcrypt = require('bcrypt');

class ClientController {
    async create(req, res, next) {
        try {
            const { position, surname, name, patronymic, telephone, email, login, password, PartnerId } = req.body;
            const hashPassword = await bcrypt.hash(password, 5);
            const client = await Clients.create({ position, surname, name, patronymic, telephone, email, login, password: hashPassword, PartnerId });
            return res.json(client);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findAll(req, res, next) {
        try {
            const clients = await Clients.findAll({
                include: {
                    model: Partners,
                    attributes: ['id', 'shortName']
                }
            });
            return res.json(clients);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async findById(req, res, next) {
        try {
            const { clientId } = req.params;
            const client = await Clients.findOne({ where: { id: clientId } });
            if (!client) {
                return next(ApiError.notFound(`Client with id ${clientId} not found`));
            }
            return res.json(client);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { clientId } = req.params;
            const { position, surname, name, patronymic, telephone, email, login, password, PartnerId } = req.body;
            const updateData = { position, surname, name, patronymic, telephone, email, login, PartnerId };

            if (password) {
                const hashPassword = await bcrypt.hash(password, 5);
                updateData.password = hashPassword;
            }

            const [updated] = await Clients.update(updateData, { where: { id: clientId } });
            if (updated) {
                const updatedClient = await Clients.findOne({ where: { id: clientId } });
                return res.json(updatedClient);
            }
            throw new Error(`Client with id ${clientId} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { clientId } = req.params;
            const deleted = await Clients.destroy({ where: { id: clientId } });
            if (deleted) {
                return res.json({ message: `Client with id ${clientId} deleted` });
            }
            throw new Error(`Client with id ${clientId} not found`);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const client = await Clients.findOne({ where: { login } });
            if (!client) {
                return next(ApiError.internal('Пользователь не найден'));
            }
            const comparePassword = bcrypt.compareSync(password, client.password);
            if (!comparePassword) {
                return next(ApiError.internal('Неверный пароль'));
            }
            const jwtToken = generateJwt(client.id, client.login);
            return res.json({ jwtToken });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async loginMobile(req, res, next) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return next(ApiError.badRequest('Логин и пароль обязательны'));
            }

            const client = await Clients.findOne({ where: { login } });

            if (!client) {
                return next(ApiError.internal('Пользователь не найден'));
            }

            const comparePassword = bcrypt.compareSync(password, client.password);

            if (!comparePassword) {
                return next(ApiError.internal('Неверный пароль'));
            }

            const partnerId = client.PartnerId;
            const partner = await Partners.findOne({ where: { id: partnerId } });

            if (!partner) {
                return next(ApiError.internal('Партнер не найден'));
            }

            const { id, surname, name, patronymic, PartnerId } = client;
            const { INN, shortName, fullName } = partner;

            const responseData = {
                id,
                surname,
                name,
                patronymic,
                INN,
                shortName,
                fullName,
                PartnerId
            };

            return res.json(responseData);
        } catch (e) {
            console.error(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ClientController();
