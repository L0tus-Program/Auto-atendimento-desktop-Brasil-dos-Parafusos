

exports.email = (comp) => {

    const nodemailer = require("nodemailer"); 
    const cfg = require("./configmail.json") // requisição ao json com a config do email remetente
    const remetente = nodemailer.createTransport({
        host: cfg.host,   
        service: cfg.service,
        port: cfg.port, //porta padrão
        secure: cfg.secure, // TRUE se eu tivesse SSL
        auth:{ // autenticação
        user: cfg.user,
        pass: cfg.pass 
        }
        });


    let emailASerEnviado = { // corpo do email

        from: "contato@brasildosparafusos.com.br",
        
        to: "felipe@brasildosparafusos.com.br",
        //cc: "felipe@brasildosparafusos.com.br", 
        subject: "Computador :" + comp, // assunto do email
        text: "Problema de conexão com o servidor detectado", // corpo do email
        /*attachments: [ // para por anexos caso necessário
            {
                filename: 'ponto.pdf',                                         
                contentType: 'Ponto Funcionario.pdf'
            }] */
        
        };

    remetente.sendMail(emailASerEnviado, function(error){ // envia o email
        if (error) { // saida de erros
        console.log(error);
        } else { // email enviado com sucesso
        console.log("Email enviado com sucesso.");
        }
        });

}

