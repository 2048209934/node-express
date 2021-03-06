var express=require("express");
var mysql=require("mysql");
var router=express.Router();
var pool=require("./../config.js");

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs

//插入图片
router.post('/incases2a',function(req,res){
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

router.get("/cases2",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from cases2', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

router.post('/accases2',function(req,res){
	var title1=req.body["title1"]
	var title2=req.body["title2"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`insert into cases2(img,title1,title2) values("${imgs}","${title1}","${title2}")`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send("上传成功")
			}
			
		})
})


router.post('/upcases2',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update cases2 set  img="${imgs}" where cid=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})

router.post('/casestext1',function(req,res){
	var id=req.body["id"]
	var title1=req.body["title1"]
	console.log(title1)
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update cases2 set  title1="${title1}" where cid=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})


router.post('/casestext2',function(req,res){
	var id=req.body["id"]
	var title2=req.body["title2"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update cases2 set  title2="${title2}" where cid=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})



router.get('/alcases2',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from cases2',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


router.post('/dlcases2',function(req,res){
	var cid=req.body["cid"]
	var imagesww=req.body["imagesww"]
	fs.unlink(imagesww);
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from cases2 where cid=${cid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})

module.exports=router;