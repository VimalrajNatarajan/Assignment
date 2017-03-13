var express    = require("express");
var mysql      = require('mysql');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json()); // support json encoded bodies

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'assignment'
});
var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected...");    
} else {
    console.log("Error connecting database ...");    
}
});

app.get("/userlist",function(req,res){
	console.log('userlist');
	var id = req.body.id;
	res.send(id);
});

app.post("/saveUser",function(req,res){
console.log('Server Starts')
 var post  = {User_ID: req.id, name: req.name,userName:req.username,email:req.email};
 console.log(post);
 var query = connection.query('INSERT INTO user SET ?', post, function(err, result) {
 res.send('sucess');
 });
});




app.get("/userlist1",function(req,res){
connection.query('SELECT * from employee', function(err, rows, fields) {
connection.end();
  if (!err){
    // console.log('The solution is: ', fields);
    res.json(rows);
  }
  else{
    console.log('Error while performing Query.');
  }
  });
});

app.listen(3000);


