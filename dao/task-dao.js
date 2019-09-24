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

    adicionar(tarefa){
      return new Promise((resolve,reject) => {
        this.db.query("INSERT INTO tarefas SET ?",//query
            [tarefa],//valor de parâmetro
            (erro) => {//callback
                if(erro)
                    return reject("Não foi possível cadastrar a tarefa." + erro);
                return resolve();
            }
        )
      });
    }//fim do método adicionar

    buscarPorId(userId,id){
        return new Promise((resolve,reject) => {
            this.db.query("SELECT id, titulo, descricao, id_usuario, replace(data,' ','T') data, date_format(data,'%d/%m/%Y %H:%i') data_formatada FROM tarefas WHERE id_usuario = ? AND id = ?",
                [userId, id],//parâmetros na ordem
                (erro, tarefa) => {
                    if(erro)
                        return reject("Erro ao buscar a tarefa. " + erro);
                    return resolve(tarefa[0]);//tarefa[0] pois o select retorna sempre um array e quero a 1a linha
                }
            )
        });
    }

    editar(tarefa){
        return new Promise((resolve,reject) => {
            this.db.query(
                //1º parâmetro - query sql
                'UPDATE tarefas SET titulo = ?, descricao = ?, data = ? WHERE id_usuario = ? and id = ?',
                //2º parâmetro - parâmetros da query
                [
                    tarefa.titulo,
                    tarefa.descricao,
                    tarefa.data,
                    tarefa.id_usuario,
                    tarefa.id
                ],
                //3º parâmetro - Callback function
                (erro) => {
                    if(erro)
                        return reject('Erro ao editar a tarefa. ' + erro);
                    else
                        return resolve();
                }
            )
        });
    }
}

module.exports = TaskDAO;
