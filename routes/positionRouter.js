const Router = require('express')
const router = new Router()
const positionController = require('../controllers/positionController')

router.post('/', positionController.create)
router.get('/', positionController.findAll)
router.get('/:positionId', positionController.findById)

module.exports = router