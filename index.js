require('dotenv').config()
const express = require('express')
const sequelize = require('./database')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHendlingMiddleware')
const multer = require('multer')

const PORT = process.env.PORT || 8080

const server = express()
server.use(cors())
server.use(express.json())



server.use(fileUpload())
server.use('/api', router)
server.use(errorHandler)

server.get('/', (req, res) => {
    res.status(200).json({ message: "Working" })
})

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => console.log(`${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
