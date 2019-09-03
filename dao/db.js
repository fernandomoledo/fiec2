const mysql = require('mysql');

const banco = 'agenda_fiec';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: banco,
    multipleStatements: true
});

db.connect( (err) => {
    if(err){
        throw err;
    }
    console.log("Conectado ao banco de dados [" + banco +"]");
});

global.db = db;

module.exports = db;


