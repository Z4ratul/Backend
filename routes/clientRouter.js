const Router = require('express');
const router = new Router();
const clientController = require('../controllers/clientController');

router.post('/', clientController.create);
router.post('/login', clientController.login);
router.post('/loginMobile', clientController.loginMobile);
router.get('/', clientController.findAll);
router.get('/:clientId', clientController.findById);
router.put('/:clientId', clientController.update);
router.delete('/:clientId', clientController.delete);

module.exports = router;
