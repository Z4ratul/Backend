const Router = require('express')
const router = new Router()
const manufacturerController = require('../controllers/manufacturerController')

router.post('/', manufacturerController.create)
router.get('/', manufacturerController.findAll)
router.get('/:manufacturerId', manufacturerController.findById)

module.exports = router