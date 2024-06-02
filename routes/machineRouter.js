const Router = require('express');
const router = new Router();
const machineController = require('../controllers/machineController');

router.post('/', machineController.create);
router.get('/', machineController.findAll);
router.get('/:VINNumber', machineController.findById);
router.put('/:VINNumber', machineController.update);
router.delete('/:VINNumber', machineController.delete);

module.exports = router;
