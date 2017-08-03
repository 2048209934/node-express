var express=require("express");
var mysql=require("mysql");
var router=express.Router();


var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var pool=require("./../config.js");


//插入图片
router.post('/inknow',function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	var form = new formidable.IncomingForm();
	form.uploadDir='public/images';
	  //上传图片存放的路径
	
	form.parse(req,function(error,fields,files){
		for(var i in files){
			var file = files[i];  //保存图片属性
			var fName = (new Date()).getTime()  //用一时间戳作为图片的名字
			switch(file.type){    //检测图片的格式
				case "image/jpeg":
				fName=fName+".jpg";
				break;
				case "image/png":
				fName=fName+".png";
				break;
				case "image/gif":
				fName=fName+".gif";

			}
			var newPath='public/images/'+fName;  //要返回的图片的路径
			fs.renameSync(file.path,newPath);
			  res.send(newPath)
		}
		imgs=`http://localhost:8100/images/${fName}`
	})
	});

router.post('/knowacf',function(req,res){
	var con=req.body["con"]
	var h2=req.body["h2"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update know set  h2="${h2}" where con=${con}`, function(err, rows, fields) {
		pool.query('SELECT * from know', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})


router.post('/know1',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update know set  img="${imgs}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})



router.post('/know2',function(req,res){
	var id=req.body["id"]
	var tit=req.body["tit"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update know set  tit="${tit}" where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from know', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})


router.post('/knowac',function(req,res){
	var id=req.body["id"] 
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from know where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from know', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})




router.get("/know",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from know', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});



//插入
router.post('/knowins',function(req,res){
	var tit=req.body["tit"]
	var con=req.body["con"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`insert into know(img,tit,con) values("${imgs}","${tit}","${con}")`,function(err,rows){
			pool.query('SELECT * from know', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
			
		})
})
module.exports=router;