const Router = require('express')
const router = new Router()
const employeeController = require('../controllers/employeeController')

router.post('/', employeeController.create)
router.post('/login', employeeController.login)
router.get('/', employeeController.findAll)
router.get('/:employeeId', employeeController.findById)

module.exports = router