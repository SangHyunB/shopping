import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import "./App.css"
import MainPage from './main/main_page.js'
import Header from './include/Header.js';
import Footer from './include/Footer.js';
import ProductPage from './products/product_page.js';
import ScrollToTop from './ScrollTop.js';
import Login from './user/login.js';
import Signup from './user/signup.js';
import Profile from './user/profile.js';
import Cart from './user/cart.js';
import SideBar from './include/SideBar.js';




function App() {
    return (
        <div className='layout'>
        
            <div className='main'>
            <BrowserRouter>
            <SideBar/>
            <Header/>
            <ScrollToTop />
                <Routes>
                    <Route path="/" element={<MainPage/>} />
                    <Route path={`/Signup`} element={<Signup/>} />
                    <Route path={`/login`} element={<Login/>} />
                    <Route path={`/profile`} element={<Profile/>} />
                    <Route path={`/cart`} element={<Cart/>} />
                    <Route path={`/products/샌즈`} element={<ProductPage/>} />
                    <Route path={`/products/하치와레`} element={<ProductPage/>} />
                    <Route path={`/products/치이카와`} element={<ProductPage/>} />
                    <Route path={`/products/아디다스 신발`} element={<ProductPage/>} />
                    <Route path={`/products/네셔널 지오그래픽 신발`} element={<ProductPage/>} />
                </Routes>
            </BrowserRouter>
            </div>
        <Footer/>
        </div>
    );
}

export default App;




