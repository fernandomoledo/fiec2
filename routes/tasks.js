const TaskController = require('../controller/task-controller');

const taskController = new TaskController();

var express = require('express');
var router = express.Router();


router.get('/', taskController.listar());

module.exports = router;
