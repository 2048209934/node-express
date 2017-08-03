var express=require("express");
var mysql=require("mysql");
var router=express.Router();
var pool=require("./../config.js");


router.get("/careers",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from careers', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});


router.post('/careersup',function(req,res){
	var work=req.body["work"]
	var duty=req.body["duty"]
	var titlea=req.body["titlea"]
	var titleb=req.body["titleb"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`insert into careers(work,duty,titlea,titleb) values("${work}","${duty}","${titlea}","${titleb}")`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send("上传成功")
			}
			
		})
})

router.post('/careerdlp',function(req,res){
	var rid=req.body["rid"]
	var titlea=req.body["titlea"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update careers set  titlea="${titlea}" where rid=${rid}`, function(err, rows, fields) {
		pool.query('SELECT * from careers', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})

router.post('/careerdlp2',function(req,res){
	var rid=req.body["rid"]
	var titleb=req.body["titleb"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update careers set  titleb="${titleb}" where rid=${rid}`, function(err, rows, fields) {
		pool.query('SELECT * from careers', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})


router.post('/careerhq1',function(req,res){
	var rid=req.body["rid"]
	var titlea=req.body["titlea"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update careers set  titlea="${titlea}" where rid=${rid}`, function(err, rows, fields) {
		pool.query('SELECT * from careers', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})

router.post('/careerhq2',function(req,res){
	var rid=req.body["rid"]
	var titleb=req.body["titleb"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update careers set  titleb="${titleb}" where rid=${rid}`, function(err, rows, fields) {
		pool.query('SELECT * from careers', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})





router.post('/careersclear',function(req,res){
	var rid=req.body["rid"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from careers where rid=${rid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})

module.exports=router;