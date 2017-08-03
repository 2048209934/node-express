var express=require("express");
var mysql=require("mysql");
var pool=require("./../config.js");
var router=express.Router();




router.get("/cases1",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from cases1', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

module.exports=router;