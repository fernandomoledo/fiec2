//importo a classe TaskDAO
const TaskDAO = require('../dao/task-dao');
//instancio o objeto da classe
const taskDAO = new TaskDAO();

class TaskController{
    listar(){
        return function(req,res){
            const sessao = req.session;
            if(sessao.nome){
                taskDAO.listar(sessao.userId)
                .then(tarefas => {
                    res.render(
                        'tarefas/listar',
                        {
                            tarefas : tarefas,
                            sessao : sessao
                        }
                    );//fecha o res.render
                }).catch(erro => console.log(erro));
            }else{
                res.redirect('/');
            }
        }
    }
}

module.exports = TaskController;