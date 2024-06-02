const Router = require('express')
const router = new Router()
const serviceListController = require('../controllers/servicelistController')

router.post('/', serviceListController.create)
router.get('/', serviceListController.findAll)
router.get('/:serviceListId', serviceListController.findById)

module.exports = router