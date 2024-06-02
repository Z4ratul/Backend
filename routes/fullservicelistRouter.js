const Router = require('express')
const router = new Router()
const fullservicelistController = require('../controllers/fullservicelistController')

router.post('/', fullservicelistController.create)
router.get('/', fullservicelistController.findAll)
router.get('/:fullServiceListId', fullservicelistController.findById)

module.exports = router