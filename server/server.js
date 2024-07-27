const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');


const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDB')
    .then(() => {
        console.log("Connected to MongoDB => UserAPI");
    })
    .catch((err) => {
        console.log(err);
    });

const UserSchema = new mongoose.Schema({
    userID:  String,
    password: String,

});

const ProductSchema = new mongoose.Schema({
    productTitle: String,
    productImg: String,
    productText: String,
    price: Number,
})

let userModel = mongoose.model('User',UserSchema);

let productModel = mongoose.model('product',ProductSchema);


/*userModel.updateOne({userID:"엄준식"},{password:"69"})
.then((users)=>{console.log(users)})*/

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'my-app/public')));

const port = process.env.PORT || 3003;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-app/public/index.html'));
});

app.post('/api/product', async (req, res) => {
    const { productName } = req.body;
  
    try {
      const product = await productModel.findOne({ productTitle: productName });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product);
    } catch (err) {
      res.status(500).send(err);
    }
  });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



/*import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'my-app/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-app/public/index.html'));
});

app.get('/api', (req, res) => {
    res.send({ message: "보이루" });
});

server.listen(3003, () => {
    console.log("server is running!!");
});*/
