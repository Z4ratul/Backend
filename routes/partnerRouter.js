const Router = require('express');
const router = new Router();
const partnerController = require('../controllers/partnerController');

router.post('/', partnerController.create);
router.get('/', partnerController.findAll);
router.get('/:id', partnerController.findById);
router.put('/:id', partnerController.update);
router.delete('/:id', partnerController.delete);

module.exports = router;
