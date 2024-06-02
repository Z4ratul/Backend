const Router = require('express')
const router = new Router()
const machinetypeController = require('../controllers/machinetypeController')

router.post('/', machinetypeController.create)
router.get('/', machinetypeController.findAll)
router.get('/:machineTypeId', machinetypeController.findById)

module.exports = router