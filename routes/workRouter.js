const Router = require('express');
const router = new Router();
const workController = require('../controllers/workController');

router.post('/', workController.create);
router.get('/', workController.findAll);
router.get('/:id', workController.findById);
router.put('/:id', workController.update);
router.delete('/:id', workController.delete);

module.exports = router;
