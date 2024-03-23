const mongoose=require('mongoose')

const ProductsSchema=new mongoose.Schema({
    productname:String,
    price:Number,
    weight:Number
})

const ProductModel=mongoose.model('product',ProductsSchema)
module.exports=ProductModel