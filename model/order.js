var mongoose=require('mongoose');
var orderSchema=mongoose.Schema({
    productId:Number,
    productName:String,
    productDescription:String,
    productSize:String,
    productPrice:Number,
    productFlavour:String,
    productImage:String,
})
var order=mongoose.model("orders",orderSchema);
module.exports=order;