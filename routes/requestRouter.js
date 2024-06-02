const Router = require('express')
const router = new Router()
const requestController = require('../controllers/requestController')

router.post('/', requestController.create)
router.post('/new', requestController.createAll)
router.get('/', requestController.findAll)
router.get('/active/:id', requestController.getAllActive)

module.exports = router