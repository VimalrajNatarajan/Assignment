var express    = require("express");
var mysql      = require('mysql');
var dateFormat = require('dateformat');
var bodyParser = require('body-parser');

var app = express();

app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

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

app.post("/saveUser",function(req,res){
console.log('Server Starts')
 var post  = {User_ID:req.body.id, name: req.body.name,userName:req.body.username,email:req.body.email};
 console.log(post);
 var query = connection.query('INSERT INTO user SET ?', post, function(err, result) {
 res.send(result);
 });
});


app.get("/userlist",function(req,res){
connection.query('SELECT * from user', function(err, rows, fields) {
connection.end();
  if (!err){
    res.json(rows);
  }
  else{
    console.log('Error while performing Query.');
  }
  });
});

app.listen(3000);


