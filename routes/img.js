var express=require('express');
var mysql=require('mysql');
var router=express.Router();

var fs=require('fs');
var formidable=require('formidable');

var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'cebest',
	port:3306
})



router.post('/img',function(req,res){
	res.header("Access-Control-Allow-Origin", "*"); //跨域
	var form = new formidable.IncomingForm();
	form.uploadDir='public/images';  //上传图片存放的路径
	
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
			}
			var newPath='public/images/'+fName;  //要返回的图片的路径
			fs.renameSync(file.path,newPath);
			res.send(newPath);   
		}
		
	})
	});
module.exports=router;