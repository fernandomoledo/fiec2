//importar conexão com o banco
const db = require('./db');

class TaskDAO{
    constructor(){
        this.db = db;
    }

    listar(userId){
        return new Promise((resolve,reject) => {
            this.db.query(
             "SELECT id,titulo,descricao,id_usuario, date_format(data,'%d/%m/%Y %H:%i') data_formatada FROM tarefas WHERE id_usuario = ? ORDER BY data,titulo",
             [userId],
             (erro, tarefas) => {
                 if(erro){
                     return reject("Não foi possível listar as tarefas. Erro: " + erro);
                 }
                 return resolve(tarefas);
             }
            )
        });
    }
}

module.exports = TaskDAO;
