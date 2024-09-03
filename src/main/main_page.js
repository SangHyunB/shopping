import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react';
import { Autoplay} from 'swiper/modules';
import Product from '../products/product.js';

import sanz from './picture/샌즈.jpg';
import ware from './picture/하치와레.png';
import chi from './picture/치이카와.png'
import shoe1 from './picture/신발.jpg'
import shoe2 from './picture/신발2.jpg'

import "./main_page.css"

import 'swiper/css'
import 'swiper/css/autoplay'



function main_page() {
  return (
    <div>
     
     <div className='banner-div'>
      <Swiper className='banner'
        modules={[Autoplay]}
        autoplay={{delay:3000}}
        spaceBetween={1}
        slidesPerView={1}
        loop={true}
        onSlideChange={() =>{}}
        onSwiper={(swiper) => {}}
      >
        <SwiperSlide className='s1'></SwiperSlide>
        <SwiperSlide className='s2'></SwiperSlide>
        <SwiperSlide className='s3'></SwiperSlide>
        <SwiperSlide className='s4'></SwiperSlide>
      </Swiper>
     </div>

      <div className='page-container'>
      <div className='main-container'>
        <Product className='ii' image={sanz} title={"샌즈"} text={"샌즈입니다."} price={15000}/>
        <Product className='ii' image={ware} title={"하치와레"} text={"하치와레!"} price={12000}/>
        <Product className='ii' image={chi} title={"치이카와"} text={"치이카와!"} price={13000}/>
        <Product className='ii' image={shoe2} title={"아디다스 신발"} text={"아디다스 신발입니다"} price={45000}/>
        <Product className='ii' image={shoe1} title={"네셔널 지오그래픽 신발"} text={"네셔널 지오그래픽 신발입니다"} price={65000}/>
      </div>
      </div>
  
    
    </div> 
  )
}

export default main_page