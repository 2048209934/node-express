var express=require("express");
var mysql=require("mysql");
var router=express.Router();
var pool=require("./../config.js");
/*router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});*/

router.post("/text",function (req,res){
	var uid=req.body["uid"]
	console.log(uid)
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`SELECT * from new`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	
	//查
	/*pool.query(`SELECT * from new where uid=${uid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});*/


	//增
	/*pool.query(`insert into new(uid,news_title) values(${uid},822)`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});*/
	
	//删
	/*pool.query(`delete from new where uid=${uid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});*/
	
	//改
	/*pool.query(`update new set uid=111 where uid=222`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});*/

});

module.exports=router;