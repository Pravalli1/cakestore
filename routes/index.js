var express = require('express');
var router = express.Router();
var product=require('../model/product');
var wishlist=require('../model/wishlist');
var order=require('../model/order');
router.get("/products",(req,res)=>{
  product.find({})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})
router.get("/get",(req,res)=>{
  const {price}=req.query;
  console.log(price)
  product.find({productPrice:{$gt:price}})
  .then((data)=>res.send(data))
  .catch((err)=>console.log(err))
})
router.get("/search",(req,res)=>{
  const {name}=req.query;
  product.find({productName:new RegExp(name,"i")})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err));
})
router.post("/add",(req,res)=>{
  var newproduct=new product(req.body);
  newproduct.save()
    .then((result)=>{
      res.send({status:"added successfully",response:result})
    })
    .catch((err)=>console.log(err))
})
router.put("/products/:id",(req,res)=>{
  product.findByIdAndUpdate(req.params.id,req.body)
  .then((result)=>res.send({status:"result",response:result}))
  .catch((err)=>console.log(err));
})
router.delete("/products/:id",(req,res)=>{
    product.findByIdAndDelete(req.params.id)
    .then((result)=>res.send({status:"product is deleted",response:result}))
    .catch((err)=>console.log(err));
})
router.get("/products/:id", (req, res) => {
  product.findById(req.params.id)
    .then((docs) => {
       res.send(docs)
    })
    .catch((err) => {
      console.error(err);
    });
});
router.get("/wishlist",(req,res)=>{
  wishlist.find({})
  .then((docs)=>res.send(docs))
  .catch((err)=>console.log(err))
})
router.post("/addwish",(req,res)=>{
  
  var newwish=new wishlist(req.body);
  newwish.save()
  .then((result)=>{
    res.send({status:"added to wishlist",response:result})
  })
  .catch((err)=>{
    console.log(err)
  })
})
router.get("/len",(req,res)=>{

  wishlist.find({})
  .then((docs)=>{
    var prdocuts=docs;
    
    res.send({length:prdocuts.length})
  })
  
})
router.get("/order",(req,res)=>{
  order.find({})
  .then((docs)=>{
    res.send(docs)
  })
  .catch((err)=>console.log(err))
})
router.post("/addorder",(req,res)=>{
  var neworder=new order(req.body);
  neworder.save()
  .then((result)=>{
    res.send({status:"order added",response:result})
  })
  .catch((err)=>console.log(err))
})
module.exports = router;
