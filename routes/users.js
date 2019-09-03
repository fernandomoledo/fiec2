const UserController = require('../controller/user-controller');

const userController = new UserController();

var express = require('express');
var router = express.Router();

//rotas
router.get('/login', userController.login());
router.post('/login', userController.login());

module.exports = router;
