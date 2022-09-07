// Подключение библиотеки
var express = require('express');
// Вызов основной функции, которая передается из модуля
var app = express();



var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'eu-cdbr-west-03.cleardb.net',
  user     : 'b190ec4547fdfc',
  password : '8bde9d40'
});

connection.connect( err => {
  if (err) {
    console.log(err)
    return err
  }
  else { 
        console.log("Databace working")
  }
})


app.get('/', (req, res) => {
  res.send('Hellow world')
})  



app.get('/api/get/user/by/login/:login', (req, res) => {
  var query = `SELECT * FROM ieshop.users WHERE Login = '${req.params.login}'`
  console.log(query)
  connection.query( query,
  (SQL_error, SQL_result) => { 
  res.json(SQL_result)
}) 
})

app.get('/api/get/all/users', (req, res) => {
  var query = `SELECT * FROM ieshop.users`
  console.log(query)
  connection.query( query,
  (SQL_error, SQL_result) => { 
  res.json(SQL_result)
}) 
})

/////////////////////////// POST ////////////////////////////////

app.post('/api/login/', (req, res) => {
  var query = `SELECT * FROM ieshop.users WHERE Login = '${req.body.login}' AND Password = '${req.body.password}'`
  console.log(query)
  connection.query( query,
  (SQL_error, SQL_result) => { 
  res.json(SQL_result)
}) 
})

app.post('/api/registrate/user', (req, res) => {
  var query = "INSERT INTO ieshop.users (`Name`, `Surname`, `Email`, `Login`, `Photo`, `Telephone`, `Password`, `Country`)"
    + `VALUES('${req.body.name}', '${req.body.surname}', '${req.body.Email}', '${req.body.Email}', '${req.body.photo}', '${req.body.telephone}', '${req.body.password}', '${req.body.country}');`
  
  console.log(query)
  connection.query( query,
  (SQL_error, SQL_result) => { 
  res.json(SQL_result)
}) 
})

app.listen(3000)