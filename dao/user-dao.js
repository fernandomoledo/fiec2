const database = require('./db');

class UserDAO{
    constructor(){
        this.db = database;
    }

    logar(email,senha){
        return new Promise((resolve,reject) => {
            this.db.query(
                "SELECT * FROM usuarios WHERE email = ? AND senha = md5(?) AND ativo = 'S'",
                [email,senha],
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