var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var pool=require("./../config.js");

//插入图片
router.post('/ingengduo',function(req,res){
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


router.post('/gengduoaa',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update gengduofuwu set  img="${imgs}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})


router.post('/gengduobb',function(req,res){
	var id=req.body["id"]
	var title1=req.body["title1"]
	var title2=req.body["title2"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update gengduofuwu set  title1="${title1}" , title2="${title2}" where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from gengduofuwu', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})


router.get("/gengduo",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from gengduofuwu', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

router.post('/gengduocs',function(req,res){
	var id=req.body["id"]
	var sumary=req.body["sumary"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update gengduofuwu set  sumary="${sumary}" where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from gengduofuwu', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})



module.exports=router;