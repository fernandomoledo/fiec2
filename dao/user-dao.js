//devemos importar as configurações do banco de dados realizadas
const database = require('./db');

class UserDAO{
    /*
        Quando instanciamos objetos da classe UserDAO, mandamos o construtor abrir uma conexão com o banco para executar as tarefas de banco de dados
    */
    constructor(){
        this.db = database;
    }

    /*
        A função logar() recebe os dados do usuário que vem do user-controller.js e faz o select no banco.

        Promise - é uma "promessa" de que a aplicação vai realizar a consulta do usuário no banco de dados. Isso serve para deixar nossa aplicação assíncrona. Se a promessa for cumprida, ele devolve o usuário encontrado no banco de dados "return resolve(usuario)"; senão, devolve um erro "return reject("Houve um erro ao tentar encontrar o usuário: " + erro);"
    */
    logar(email,senha){
        return new Promise((resolve,reject) => {
            this.db.query(
                "SELECT * FROM usuarios WHERE email = ? AND senha = md5(?) AND ativo = 'S'",
                [email,senha],
                /*
                 O erro é obrigatório ser o 1º parâmetro. O 2ª parâmetro é o nome da variável que queremos que guarde o resultado do select. Essa variável não deve ser declarada pois é um parâmetro de arrow function.

                 function(erro,usuario){
                    //código da function
                 }

                 equivale a

                 (erro, usuario) => {
                    //código da function
                 }

                 */
                (erro,usuario) => {
                    if(erro){
                        return reject("Houve um erro ao tentar encontrar o usuário: " + erro);
                    }
                    return resolve(usuario);
                }
            )
        });
    }
}

module.exports = UserDAO;