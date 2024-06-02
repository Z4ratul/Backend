const Router = require('express')
const router = new Router()
const detailController = require('../controllers/detailController')

router.post('/', detailController.create)
router.get('/', detailController.findAll)
router.get('/:vendorCode', detailController.findById)

module.exports = router