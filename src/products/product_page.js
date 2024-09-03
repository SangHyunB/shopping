import React from 'react'
import { useEffect } from 'react'
import "./product_page.css"
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';

function Product_page() {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [popup,setPopup] = useState(false);

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

  useEffect(()=>{
    const pathname = location.pathname;
    const enproductName = pathname.split('/').pop();
    const productName = decodeURIComponent(enproductName);

    let viewItem = JSON.parse(sessionStorage.getItem('viewItem'))||[];
    if(!viewItem.includes(productName)){
      viewItem.push(productName);
      sessionStorage.setItem('viewItem',JSON.stringify(viewItem));
    }
  },[location]);

  if(!product){
    return <div>loaing</div>
  }

  const addCart = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3003/api/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('userToken')}`,

        },
        body: JSON.stringify({ userName: localStorage.getItem('user'), product }),
      });
      if(response.ok){
        console.log(response);
        alert("장바구니에 상품을 담았습니다");
      }
      else if (!response.ok) {
        alert('인증 오류: 로그인 상태를 확인해 주세요.');
      }
     
    } catch (error) {
      console.error('Error:', error);
    } 
     
    
  };

  const popupOpen = ()=>{
    console.log("호출")
    setPopup(true);
  };

  const popupClose= ()=>{
    setPopup(false);
  };

  return (
    
    <div className='container'>
      <div className='productImg-div'><img src={product.productImg} alt=" " className='productImg'/></div>
      <h1 className='productName'>{product.productTitle}</h1>
      <h4 className='productText'>{product.productText}</h4>
      <h1 className='price'>{product.price}원</h1>
      <div className='button-div'>
        <button variant="contained" className='basket'
        onClick={(e)=>{
          addCart(e)
        }}>장바구니</button>
        <button variant="contained" className='buy'
        onClick={popupOpen}>구매하기</button>
      </div>
     
      <Modal className="popup" isOpen={popup} isClose={popupClose}>
        <div className='popup_content'>
          <h3 className='payTitle'>상품결제 
            <button className='popupClose_button' onClick={popupClose}>X</button>
          </h3>
          <p>주문자</p>
          <p>상품이름</p>
          <p>가격</p>
        </div>
      </Modal>
    
    </div>
  )
}

export default Product_page