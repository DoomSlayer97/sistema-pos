const { Router } = require('express');
const routes = Router();

const userController = require('../controllers/userController')

routes.post('/', userController.create);
routes.get('/', userController.findAll);
routes.get('/:id', userController.findOne);
routes.put('/:id', userController.update);
routes.delete('/:id', userController.deleteOne);

module.exports = routes;
