var mongoose=require('mongoose');
var productSchema=mongoose.Schema({
    productId:Number,
    productName:String,
    productDescription:String,
    productSize:String,
    productPrice:Number,
    productFlavour:String,
    productImage:String,
})
var product=mongoose.model("products",productSchema);
module.exports=product;