/*
    Devemos importar a classe IndexController para que a rota index.js apenas "roteie" requisições. Quem deve se preocupar com o processamento das requisições é o controller
*/

const IndexController = require('../controller/index-controller');
const indexController = new IndexController();

var express = require('express');
var router = express.Router();

//chamados o método index() do controller index-controller.js
router.get('/', indexController.index());

module.exports = router;
