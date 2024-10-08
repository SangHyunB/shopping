import React from 'react'
import './product.css'
import { Link } from 'react-router-dom'


function product({ className = '',image ,title ,text ,price }) {
  return (
       <div className={`product ${className}`}>
        <div className="product_img_div"><img src={image} alt=" " className="product_img"/></div>
          <h5 className="product_title"> {title}</h5>
          <p className="product_des"> {text}</p>
          <h1 className="product_price"> {price}원</h1>
          <div className="product_link_div"><Link className="product_link" to={`/products/${title}`}
          > 구매하기</Link>
          </div>
       </div> 
  )
}

export default product