var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/*
  Para usar mensagens de erro e sucesso no Expres, instalamos o express-flash:
  npm install -s express-flash
  

  Para trabalharmos com sessões de acesso, instalamos o express-session:
  npm install -s express-session
  
  
  Após:  
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  Configuramos a sessão.

  Na linha 43 deste arquivo, inicializamos o express-flash

*/
var flash = require('express-flash');
var session = require('express-session');

/*
  O express já importou automaticamente nossos 2 primeiros arquivos de rotas
*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'fiecinformatica2019', //chave de criptografia da nossa sessão. Pode ser o texto que você quiser
  resave : false, 
  saveUninitialized: false
}));

app.use(flash()); // para utilizar o flash

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
  O Express já configurou a aplicação para que quando a rota / seja chamada, ele requeira o arquivo /routes/index.js
  Se for a rota /users, o express chama o arquivo /routes/users.js
*/
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
