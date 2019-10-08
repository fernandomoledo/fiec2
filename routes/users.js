/*
    Devemos importar a classe UserController para que a rota users.js apenas "roteie" requisições. Quem deve se preocupar com o processamento das requisições é o controller
*/
const UserController = require('../controller/user-controller');
const userController = new UserController();

var express = require('express');
var router = express.Router();

/*
    criamos uma rota do tipo POST  '/login' para realizar o login.

    No formulário de login - página index.ejs dentro da pasta views -, chamados o method="POST" e action="/users/login"

    Notem em app.js que o Express configurou automaticamente para nós que as rotas pra "users" respondem no endereço "/users" . Por isso, abaixo usamos só "/login". Se juntarmos /users/login temos a rota desejada.


*/
router.post('/login', userController.login());
router.get('/logout', userController.logout());
router.get('/myaccount', userController.formEditarMeusDados());
router.put('/password', userController.alterarSenha());

module.exports = router;
