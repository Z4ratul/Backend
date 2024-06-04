const Router = require('express');
const router = new Router();
const machineController = require('../controllers/machineController');

router.post('/', machineController.create);
router.get('/partner/:PartnerId', machineController.findAll);
router.get('/web', machineController.findAllWeb);
router.get('/:VINNumber', machineController.findById);
router.put('/:VINNumber', machineController.update);
router.delete('/:VINNumber', machineController.delete);

module.exports = router;
