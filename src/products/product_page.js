import React from 'react'
import { useEffect } from 'react'
import "./product_page.css"
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import sanz from '../main/picture/샌즈.jpg'


function Product_page() {
  const location = useLocation();
  const { image, title, text, price } = location.state || {};
  const [product, setProduct] = useState(null);


  useEffect(() => {
    const pathname = location.pathname;
    const enproductName = pathname.split('/').pop();
    const productName = decodeURIComponent(enproductName);
  
  
    fetch('http://localhost:3003/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName })
    })
    .then(response => response.json())
    .then(data =>{ setProduct(data) })
    .catch(error => console.error('Error:', error));
   
  }, [location]);
  if(!product){
    return <div>loaing</div>
  }
  console.log(product.productImg)

  return (
    
    <div className='container'>
      <div className='productImg-div'><img src={product.productImg} alt=" " className='productImg'/></div>
      <h1 className='productName'>{product.productTitle}</h1>
      <h4 className='productText'>{product.productText}</h4>
      <h2 className='price'>{price}원</h2>
      <div className='button-div'>
      <button variant="contained" className='basket'>장바구니 버튼</button>
      <button variant="contained" className='buy'>구매하기 버튼</button>
      </div>
    </div>
  )
}

export default Product_page