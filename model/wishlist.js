var mongoose=require('mongoose');
var wishlistSchema=mongoose.Schema({
    productId:Number,
    productName:String,
    productDescription:String,
    productSize:String,
    productPrice:Number,
    productFlavour:String,
    productImage:String,
})
var wishlist=mongoose.model("wishlist",wishlistSchema);
module.exports=wishlist;