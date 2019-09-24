const TaskController = require('../controller/task-controller');

const taskController = new TaskController();

var express = require('express');
var router = express.Router();


router.get('/', taskController.listar());
router.get('/add',taskController.formAdicionar());
router.post('/add',taskController.adicionar());
router.get('/edit/:id',taskController.formEditar());
router.put('/edit/:id',taskController.editar());
/*
router.route('/edit/:id)
    .get(taskController.formEditar())
    .put(taskController.editar());
*/

module.exports = router;
