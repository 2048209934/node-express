var express=require('express');
var mysql=require('mysql');
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var pool=require("./../../config.js");

//插入图片
router.post('/incases1a',function(req,res){
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
	
//插入文本
//案例一
router.post('/accases1',function(req,res){
	var con=req.body["text"]
	console.log(imgs)
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`insert into cases1(src,con) values("${imgs}","${con}")`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send("上传成功")
			}
			
		})
})







//修改
//案例一
router.post('/upcases1',function(req,res){
	var cid=req.body["cid"]
	console.log(cid)
	console.log(imgs)
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update cases1 set  src="${imgs}" where cid=${cid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})

router.post('/upscases1',function(req,res){
	var cid=req.body["cid"]
	var con=req.body["con"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update cases1 set  con="${con}" where cid=${cid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})







//调取图片
//案例一
router.get('/alcases1',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from cases1',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})



//删除
//案例一
router.post('/dlcases1',function(req,res){
	var cid=req.body["cid"]
	var imagesww=req.body["imagesww"]
	fs.unlink(imagesww);
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from cases1 where cid=${cid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})


module.exports=router;