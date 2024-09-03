import React, { useState } from 'react'
import './SideBar.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SideBar() {
  const [item,setItem] = useState([]);
  const location = useLocation();
  useEffect(()=>{
    const fetchItem = async()=>{
      try{
        const viewItem = JSON.parse(sessionStorage.getItem('viewItem')) || [];
        console.log(viewItem)
        if(viewItem.length > 0){

          const response = await fetch("http://localhost:3003/api/viewItem",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            },
            body:JSON.stringify({viewItem}),
          });
          const data = await response.json();
          setItem(data);
          console.log(item);
        }
      }catch(err){
        console.log(err)
      }}
      fetchItem();
  },[location])  
  return (
    <div className='sidebar-container'>  
        <div className='sidebar'>
          {
           item.length === 0 ? (
            <p>여러 상품들을 둘러보세요</p> 
          ) :
         
          item.map((item, index) => (
              <div className='내용물' key={index}>
                <Link to={"/products/" + item.productTitle}>
                  <img className='사진' src={item.productImg} alt={item.productTitle}></img>
                </Link> 
              </div>  
              ))
            }
        </div>
    </div>
  )
}

export default SideBar