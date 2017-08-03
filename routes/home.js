var express=require("express");
var mysql=require("mysql");
var router=express.Router();
var pool=require("./../config.js");



router.get("/home",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from home', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

router.post('/homeac',function(req,res){
	var id=req.body["id"]
	var tita=req.body["tita"]
	var titEn=req.body["titEn"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update home set  tita="${tita}", titEn="${titEn}" where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from home', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})

module.exports=router;