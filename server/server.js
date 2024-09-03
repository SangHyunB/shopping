const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel,productModel,cartModel} = require('./database')
const authenticateToken = require('./authToken');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'my-app/public')));

const port = process.env.PORT || 3003;
const SECRET_KEY = 'gayson';

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'my-app/public/index.html'));
});

app.post('/api/login', async (req,res)=>{
    const {id,password} = req.body;
    const user = await userModel.findOne({userID:id});

    if (user&& await bcrypt.compare(password,user.password)){
        const token = jwt.sign({ userObjId: user._id}, SECRET_KEY,{expiresIn: '1h' });
        const userName = user.userID;
        res.send({message: '로그인성공',token,userName});
        console.log(userName);   
    }
    else{
        res.status(401).send({message:'로그인 실패'});
        console.log("실패");
    }
});

app.post('/api/signup', async(req,res)=>{
    const {id,password} = req.body;

    try {
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({ userID: id, password: hashedPassword });
        res.status(201).send({ message: "유저의 회원가입이 성공함" });
    } catch (err) {
        res.status(500).send({ message: "서버 오류" });
    } 
})

app.post('/api/check-id', async (req, res) => {
    const { userID } = req.body;
    try {
      const user = await userModel.findOne({ userID });
      if (user) {
        res.send({ available: false });
      } else {
        res.send({ available: true });
      }
    } catch (err) {
      res.status(500).send({ error: '서버 오류' });
    }
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

app.post('/api/addCart',authenticateToken, async (req,res)=>{
  const {userName,product} = req.body
  const {productTitle,productImg,price} =product;
  
  try {
    await cartModel.create({ 
      user:userName,
      productTitle: productTitle,
      productImg: productImg,
      price:price,
    }); 
    res.status(201).send({ message: 'Product added to cart' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error', error: err.message });
  }
});

app.post('/api/cart', async(req,res)=>{
  const {userName} = req.body;
  console.log(req.body)
  try{
    const cartProduct = await cartModel.find({user:userName});
    res.json(cartProduct);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.delete('/api/itemDelete',authenticateToken, async (req, res) => {
    const { id } = req.body;

    try{
      await cartModel.findByIdAndDelete(id);
      res.status(200).send({ message: '장바구니 아이템 삭제완료' });
    }catch(err){
      console.error('error',err);
      res.status(500).send(err);
    }
});

app.post('/api/viewItem',async(req,res)=>{   // 최근본상품api
  const {viewItem} = req.body;
  
  try{
    const items = await productModel.find({productTitle:{$in: viewItem}},
      { _id: 0, productImg: 1, productTitle: 1} 
    );
    console.log('Fetched items:', items);
    res.json(items);
  }catch(err){
    res.status(500).json({err});
  }
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



