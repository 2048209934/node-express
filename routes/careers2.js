var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var imgs
var pool=mysql.createPool({
	host:"127.0.0.1",
	user:"root",
	password:"",
	database:"cebest",
	port:"3306"
});

//插入图片
router.post('/incareers2',function(req,res){
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

	
router.post('/upcareers2img',function(req,res){
	var id=req.body["id"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update careers2 set  img="${imgs}" where id=${id}`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
})



router.get("/careers2",function (req,res){
	res.header("Access-Control-Allow-Origin", "*");
	pool.query('SELECT * from careers2', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
});

router.post('/upcareers2',function(req,res){
	var id=req.body["id"]
	var title1=req.body["title1"]
	var title2=req.body["title2"]
	var con=req.body["con"]
	res.header("Access-Control-Allow-Origin", "*");
pool.query(`update careers2 set  title1="${title1}", title2="${title2}", con="${con}" where id=${id}`, function(err, rows, fields) {
		pool.query('SELECT * from careers2', function(err, rows, fields) {
		if (err) throw err;
	  	res.send(rows)
	});
	});
})


module.exports=router;