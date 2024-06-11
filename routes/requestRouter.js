const Router = require('express')
const router = new Router()
const requestController = require('../controllers/requestController')

router.post('/', requestController.create)
router.post('/new', requestController.createAll)
router.get('/:PartnerId', requestController.findAll)
router.get('/partner/web', requestController.findAllWeb)
router.get('/active/:PartnerId', requestController.getAllActive)

module.exports = router
