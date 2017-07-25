var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"",
	database:"cebest",
	port:"3306"
});


router.get("/chinese2",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from chinese2', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

module.exports=router;