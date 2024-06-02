const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Manufacturers = sequelize.define('Manufacturers', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

const MachineTypes = sequelize.define('MachineTypes', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

const Statuses = sequelize.define('Statuses', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

const ServiceLists = sequelize.define('ServiceLists', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

const FullServiceLists = sequelize.define('FullServiceLists', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
    price: { type: DataTypes.DECIMAL(10, 2) }
})

const Positions = sequelize.define('Positions', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true }
})

const Partners = sequelize.define('Partners', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    INN: { type: DataTypes.STRING, unique: true },
    shortName: { type: DataTypes.STRING },
    fullName: { type: DataTypes.STRING }
})

const Details = sequelize.define('Details', {
    vendorCode: { type: DataTypes.STRING, primaryKey: true },
    detailName: { type: DataTypes.STRING, unique: true },
    QTY: { type: DataTypes.INTEGER },
    price: { type: DataTypes.DECIMAL(10, 2) }
})

const Clients = sequelize.define('Clients', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    position: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    telephone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
})

const Machines = sequelize.define('Machines', {
    VINNumber: { type: DataTypes.STRING, primaryKey: true, unique: true, allowNull: false },
    modelName: { type: DataTypes.STRING, allowNull: false },
    serialNumber: { type: DataTypes.STRING, allowNull: false },
    dateOfManufacture: { type: DataTypes.DATEONLY, allowNull: false },
    image: { type: DataTypes.STRING }
})

const Requests = sequelize.define('Requests', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    openDate: { type: DataTypes.DATEONLY },
    closeDate: { type: DataTypes.DATEONLY },
    description: { type: DataTypes.STRING }
})

const Employees = sequelize.define('Employees', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    surname: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    telephone: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    login: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
})

const Works = sequelize.define('Works', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// Defining associations based on the schema
Manufacturers.hasMany(Machines)
Machines.belongsTo(Manufacturers)

MachineTypes.hasMany(Machines)
Machines.belongsTo(MachineTypes)

Partners.hasMany(Clients)
Clients.belongsTo(Partners)

Partners.hasMany(Machines)
Machines.belongsTo(Partners)

Machines.hasMany(Requests)
Requests.belongsTo(Machines)

Partners.hasMany(Requests)
Requests.belongsTo(Partners)

ServiceLists.hasMany(Requests)
Requests.belongsTo(ServiceLists)

Details.hasMany(Works)
Works.belongsTo(Details)

Statuses.hasMany(Works)
Works.belongsTo(Statuses)

FullServiceLists.hasMany(Works)
Works.belongsTo(FullServiceLists)

Employees.hasMany(Works)
Works.belongsTo(Employees)

Requests.hasMany(Works)
Works.belongsTo(Requests)

Positions.hasMany(Employees)
Employees.belongsTo(Positions)

module.exports = {
    Manufacturers,
    MachineTypes,
    Statuses,
    ServiceLists,
    FullServiceLists,
    Positions,
    Partners,
    Details,
    Clients,
    Machines,
    Requests,
    Employees,
    Works
}
