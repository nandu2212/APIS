const express=require("express")
const mongoose=require("mongoose")
const ejs=require("ejs")
const app=express()


const inventorySchema=require("./inventoryschema")
const customerSchema=require("./customerscema")
const orderSchema=require("./orderschema")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(5000, (err, res)=> {
    if(!err) {
        console.log("Server started on port 5000")
    } else {
        console.log(err)
    }
})
mongoose.connect("mongodb+srv://insta:insta@instagram.fcb6e.mongodb.net/APP-Webtech-Assignment?retryWrites=true&w=majority", ()=> {
    console.log("connected to db")
}, (err)=> {
    
})

app.set("view engine", "ejs");

//inventory
app.get("/",(req,res)=>{
    inventorySchema.find().then((user)=>{
        res.render("inventory",{user})
    })
})
app.post("/createInventory",(req,res)=>{
    inventorySchema.create({
        Inventory_id:req.body.Inventory_id,
        InventoryType:req.body.InventoryType,
        ItemName:req.body.ItemName,
        AvailableQuantity:req.body.AvailableQuantity
    }).then((data)=>{
        res.status(200).send("data posted successfully")
    }).catch((err)=>{
        console.log(err)
    })
})

//customers
app.post("/customer",(req,res)=>{
    console.log(req.body)
    customerSchema.create({
        customer_id:req.body.customer_id,
        customerName:req.body.customerName,
        email:req.body.email
    }).then((data)=>{
        console.log(data)
        res.status(200).send("data posted successfully")
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/customer",(req,res)=>{
    customerSchema.find().then((customer)=>{
        res.render("customer",{customer})
        console.log(customer)
    })
})

//orders
app.post("/order",(req,res)=>{
    orderSchema.create({
        customer_id:req.body.customer_id,
        Inventory_id:req.body.Inventory_id,
        ItemName:req.body.ItemName,
        Quantity:req.body.Quantity
    }).then((data)=>{
        res.status(200).send("Order Posted")
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/order",(req,res)=>{
    orderSchema.find().then((order)=>{
        if(order.Inventory_id===user.Inventory_id){
            if(user.AvailableQuantity>=order.Quantity){
            user.AvailableQuantity=user.AvailableQuantity-order.Quantity}
            else{
                res.status(200).send("out of stock")
            }
        }
        res.render("order",{order})
    })
})

app.get("/inventory",(req,res)=>{
    inventorySchema.find().then((user)=>{
        res.render("inventorydetails",{user})
    })
})

app.get("/inventory/electronic",(req,res)=>{
if(req.body.InventoryType==="Electronics"){
    inventorySchema.find().then((user)=>{
        res.render("inventorydetails",{user})
    })}
})