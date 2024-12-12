var express = require('express');
var User=require('../model/user');
var bcrypt=require('bcryptjs');
var mailer=require('nodemailer');
var router = express.Router();
router.get("/get",(req,res)=>{
  User.find({})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})
router.post("/registration",(req,res)=>{
  User.findOne({username:req.body.username})
  .then(async(dbuser)=>{
    
      if(dbuser!=null){
        res.send({status:"user already exist"})
      }
      else{
        var newuser=new User({
          username:req.body.username,
          password:await bcrypt.hash(req.body.password,10),
          email:req.body.email,
          phone:req.body.phone,
          role:req.body.role
        });
        newuser.save()
        .then((result)=>{
          var transporter=mailer.createTransport({
            host:"smtp.gmail.com",
            auth:{
              user:"pentakotapravallika6@gmail.com",
              pass:"xwfa osgf nolx asjm"
            }
          })
          var mailoptions={
            from:"pentakotapravallika6@gmail.com",
            to:req.body.email,
            subject:"Registration Successfull",
            text:"Hello "+req.body.username+" your account is created successfully"
          }
          transporter.sendMail(mailoptions,(err,info)=>{
            console.log(mailoptions);
            if(err){
               console.log(err);
            }
            else{
              console.log("email sent"+info.response)
            }
          })
          res.send({status:"user registered successfully", response:result})
        })
        .catch((err)=>
          console.log(err))
      }
    
  })
  .catch((err)=>{
    console.log(err)
  })
})
router.post("/login",(req,res)=>{
  User.findOne({username:req.body.username})
  .then(async(dbuser)=>{
    if(dbuser!=null){
      if(await bcrypt.compare(req.body.password,dbuser.password)){
        res.send({status:"login success",role:dbuser.role,response:dbuser})
      }
      else{
        res.send({status:"invalid username or password"})
      }
    }
    else{
      res.send({status:"user not found"})
    }
  })
  .catch((err)=>{
    res.send({status:"something went worng"})
  })
})



module.exports = router;
