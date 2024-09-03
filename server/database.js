const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDB')
    .then(() => {
        console.log("Connected to MongoDB => UserAPI");
    })
    .catch((err) => {
        console.log(err);
    });

const UserSchema = new mongoose.Schema({
    userID:{
        type: String,
        required: true,
        unique: true,
    } ,
    password: {
        type: String,
        required: true,
    }

});

const ProductSchema = new mongoose.Schema({
    productTitle: String,
    productImg: String,
    productText: String,
    price: Number,
})

const CartSchema = new mongoose.Schema({
    user:String,
    productTitle: String,
    productImg: String,
    price:Number,
})

const userModel = mongoose.model('User',UserSchema);
const productModel = mongoose.model('product',ProductSchema);
const cartModel = mongoose.model('cart',CartSchema);

module.exports={userModel,productModel,cartModel};