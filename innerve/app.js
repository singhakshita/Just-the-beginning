var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

app.use(bodyParser());
var url ="mongodb+srv://Akshita:94@Akshita@cluster0.nsnzp.mongodb.net/test?retryWrites=true&w=majority";
app.use(express.static("./public"));
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(function (conn) {
  console.log("Plan Db connected");
}).catch(function (err) {
  console.log(err);
})
const ut = mongoose.model('ut', { Name: String ,Age:Number,gender:String,College:String,Mobile:Number,email:String,password:String});
// ,Age:Number,College:String,Mobile:Number,email:String,password:String

app.get("/", function(req ,res){
   res.sendFile(path.join(__dirname,'/index.html'));
})


app.post("/register",function(req,res){
  
  const p1 = new ut({  Name: req.body.Name,Age:req.body.Age,gender:req.body.gender,College:req.body.College,Mobile:req.body.Mobile,email:req.body.email,password: req.body.password});
   // Age:req.body.Age,College:req.body.College,Mobile:req.body.Mobile,email:req.body.email,password: req.body.password
    p1.save().then(function(){console.log("saved")});
  
    console.log(req.body);
    res.sendFile(path.join(__dirname,'/sent.html'));
   
})

app.listen(3000, function(){
    console.log("server started");
})