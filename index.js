const express = require('express')
const app = express()

var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const mysql = require('mysql')

const port = process.env.PORT || 3000

var connection = mysql.createConnection({
  host     : 'eu-cdbr-west-03.cleardb.net',
  user     : 'b190ec4547fdfc',
  password: '8bde9d40', 
  database: 'heroku_3f03a9861b68fae'
});

var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jointlord0@gmail.com',
        pass: 'rgefrgywozwixwwp'
      }
});

app.get('/', (req, res) => {
  res.send('Hellow world')
})  



app.get('/api/get/user/by/login/:login', (req, res) => {
  var query = `SELECT * FROM heroku_3f03a9861b68fae.user WHERE Login = '${req.params.login}'`
  console.log(query)
  connection.query( query,
  (SQL_error, SQL_result) => { 
  res.json(SQL_result)
}) 
})


app.get('/api/sendEmail/:email/:code', (req, res) => { 
  
          

            var mailOptions = {
              from: 'jointlord0@gmail.com',
              to: `${req.params.email}`,
              subject: 'Authorization IEshop',  
            text: `Hello. Welcome to IEshop - you can send everything, even a cow \n Your authorization code: ${req.params.code} `
            };
  
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                res.json(`{"Error" : "true" , "measage" : "${error.message}"}`)
              } else {
                console.log('Email sent: ' + info.response);
                res.json(`{"Error" : "false" , "measage" : "${info.response}"}`)
              }
            });           

})

app.get('/api/get/all/users', (req, res) => {
  var query = `SELECT * FROM heroku_3f03a9861b68fae.user`
  console.log(query)
  connection.query( query,
  (SQL_error, SQL_result) => { 
  res.json(SQL_result)
}) 
})

/////////////////////////// POST ////////////////////////////////

app.post('/api/login/', (req, res) => {
  var query = `SELECT * FROM heroku_3f03a9861b68fae.user WHERE Login = '${req.body.Login}' AND Password = '${req.body.Password}'`
  console.log(query)
  connection.query( query,
  (SQL_error, SQL_result) => { 
      res.json(SQL_result)
}) 
})

app.post('/api/registrate/user', (req, res) => {
  var query = "INSERT INTO heroku_3f03a9861b68fae.user (`Name`, `Surname`, `Email`, `Login`, `Photo`, `Telephone`, `Password`, `Country`)"
    + `VALUES('${req.body.Name}', '${req.body.Surname}', '${req.body.Email}', '${req.body.Email}', '${req.body.Photo}', '${req.body.Telephone}', '${req.body.Password}', '${req.body.Country}');`
  
  console.log("Request = "+req)
  var name = req.body.Name
  var surname = req.body.Surname
   var Email = req.body.Email
  var photo = req.body.Photo
  var telephone = req.body.Telephone
  var password = req.body.Password
  var country = req.body.Country
  
  console.log(query)
        connection.query( query,
          (SQL_error, SQL_result) => { 
         
            result = `{ "Name":"${name}","Surname": "${surname}","Email": "${Email}","Login": "${Email}","Photo": "${photo}","Telephone": "${telephone}", "Password": "${password}","Country": "${country}" }` 
          returned = JSON.parse(result)
          console.log("Res = "+result.name+"Name = "+name)
            res.json(returned)
          
      }) 
})





app.listen(port)
console.log(`Server is listening on port ${port}`);