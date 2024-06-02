const Router = require('express')
const router = new Router()
const statusController = require('../controllers/statusController')

router.post('/', statusController.create)
router.get('/', statusController.findAll)
router.get('/:statusId', statusController.findById)

module.exports = router