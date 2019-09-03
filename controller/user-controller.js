const UserDAO = require('../dao/user-dao');
const userDAO = new UserDAO();


class UserController{
    login(){
        return function(req,res){
            const email = req.body.email;
            const senha = req.body.senha;

            userDAO.logar(email,senha)
            .then( (usuario) => {
                if(usuario != ''){
                    req.session.userId = usuario[0].id;
                    req.session.nome = usuario[0].nome;
                    req.session.email = usuario[0].email;
                    req.session.tipo = usuario[0].tipo;
                    req.session.foto = usuario[0].foto;
                    res.redirect('/home');
                }else{
                    req.flash('error','Usuário e/ou senha inválidos! Tente novamente.');
                    res.render('index', { email: email});
                }
            }).catch(erro => console.log(erro));

        };
    }
}

module.exports = UserController;