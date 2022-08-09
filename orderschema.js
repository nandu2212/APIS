const mongoose=require("mongoose")
const ordersModel=new mongoose.Schema({
    customer_id:{
        type:String,
        require:true
    },Inventory_id:{
        type:String,
        require:true
    },
    ItemName:{
        type:String,
        require:true
    },
   Quantity:{
        type:Number,
        require:true
    }
})
const orderSchema=mongoose.model("order",ordersModel)
module.exports=orderSchema