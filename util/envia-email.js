const nodemailer = require('nodemailer');
//https://nodemailer.com/about/
class EnviaEmail{
    static enviar(dados_usuario,senhaPadrao){
      
        var transporte = nodemailer.createTransport({
           service : `gmail`,
            /*
              https://myaccount.google.com/lesssecureapps?pli=1
            */
            auth: {
              user: '',
              pass: ''
            } 
            
          });

          var email = {
            from: '', // Quem enviou este e-mail
            to: dados_usuario.email, // Quem receberá
            subject: 'Agenda de tarefas - Reset de senha',  // Um assunto bacana :-) 
            html: '<p>Olá, ' + dados_usuario.nome + '. Sua senha foi alterada para "<strong>' + senhaPadrao + '</strong>".</p>' // O conteúdo do e-mail
          };

          transporte.sendMail(email, function(err, info){
            if(err){
              console.log(err);

            }else{              
              console.log('Email enviado! Leia as informações adicionais: ', info);

            
            }
            
          });
          return true;
    }
}

module.exports = EnviaEmail;