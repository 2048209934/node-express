var express=require('express');
var mysql=require('mysql');
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'cebest',
	port:3306
})

//插入图片
router.post('/incases1',function(req,res){
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
			 // res.send(fName)
		}
		imgs=`http://localhost:8100/images/${fName}`
		console.log(imgs)
	})
	});
	
	
//插入文本
router.post('/accases1',function(req,res){
	var con=req.body["text"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`insert into cons(src,con) values("${imgs}","${con}")`,function(err,rows){
			if (err) throw err;
			if(rows){
				res.send("上传成功")
			}
			
		})
})


//修改
//router.post('/accases1',function(req,res){
//	var con=req.body["text"]
//	res.header("Access-Control-Allow-Origin", "*");
//pool.query(`update new set uid=111 where uid=222`, function(err, rows, fields) {
//		if (err) throw err;
//	  	res.send(rows)
//	});
//})


//调取图片
router.get('/alcases1',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from cons',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})

router.get('/alcases2',function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('select * from cases',function(err,rows){
		if(err) throw err;
		res.send(rows);
	})
})


//删除
router.post('/dlcases1',function(req,res){
	var cid=req.body["cid"]
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from cons where cid=${cid}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
})
module.exports=router;