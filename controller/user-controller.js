/*
    Para acessarmos as funcionalidades de banco da tabela "usuarios", devemos importar (require) a classe UserDAO que foi criada na pasta "dao".

    Após, devemos instanciar o objeto userDAO para usar os recursos da classe
*/

const UserDAO = require('../dao/user-dao');
const userDAO = new UserDAO();


class UserController{
    /*
        O método login recebe os dados do corpo do formulário (email e senha);
        Chama o método logar() da classe UserDAO e verifica se o login é válido. Se for, criamos uma sessão de permissão de acesso do usuário em nossa aplicação e redirecionamos ele para a página /home.

        DICA: Para usar sessões, devemos configurar a aplicação. Veja o arquivo app.js na raiz do projeto.

        Lembrete: usuario[0] pois o retorno do select é um array. Logo, se o login é de 1 usuário, o select retorna 1 linha e consequentemente, devemos acessar a posição 0 do array.

        Caso o login seja negado, o usuário será redirecionado para / (raiz da aplicação, tela de login), recebendo a mensagem do tipo 'error' - 'Usuário e/ou senha inválidos! Tente novamente.'

    */
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
                    res.redirect('/');
                }
            }).catch(erro => console.log(erro));

        };
    }
}

module.exports = UserController;