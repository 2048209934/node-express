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


router.get("/contact",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from contact', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

router.post('/upcontact',function(req,res){
	var con=req.body["con"]
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update contact set  ${id}="${con}" where uid=1`, function(err, rows, fields) {
		pool.query('SELECT * from contact', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})

module.exports=router;