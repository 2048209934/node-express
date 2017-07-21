var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"",
	database:"mengyu",
	port:"3306"
});
/*router.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});*/


router.get("/text",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	// res.send([
	// 	{name:"dasd",title:"4231"},
	// 	{name:"gdfdfg",title:"6735"},
	// 	{name:"rteyer",title:"98797"},
	// 	{name:"ncvbn",title:"65467"}
	// ])
	pool.query('SELECT * from new', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

module.exports=router;