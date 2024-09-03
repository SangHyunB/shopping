import React, { useState, useEffect } from 'react';
import "./Header.css"
import {Bag}  from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [isLogin,setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // 로컬 스토리지에서 토큰 확인
        const token = localStorage.getItem('userToken');
        setIsLogin(token); 
    }, [isLogin]);
 
  return (
    <div className='header'>
    <div className='contents'>
        <div className='title'>
            <Bag className='bag'/>
            <Link className='LOGO' to={'/'}>
                SSHOP
            </Link>
        </div>
      
        <div className='navigate'>
            <ul className='menus'>
                <li>
                    오늘행사
                </li>
                <li>
                    인기아이템
                </li>
                <li>
                    쿠폰
                </li>
                <li>
                    고객센터
                </li>
            </ul>

            <ul className='user_link'>
                {!isLogin?(
                <>
                    <li className='login-div'>
                        <Link className='login' to={'/login'}>로그인</Link>
                     </li>
    
                    <li className='signup-div'>
                        <Link className='signup' to={'/signup'}>회원가입</Link>
                    </li>
                </>
                ):(
                <>
                    <li className='cart-div'>
                        <Link className='cart' to={'/cart'}>장바구니</Link>
                    </li>
                    <li className='profile-div'>
                        <Link className='profile' to={'/profile'}>프로필</Link>
                    </li>
    
                    <li className='logout-div'>
                        <button className='logout'
                         onClick={()=>{localStorage.removeItem('userToken')
                         localStorage.removeItem('user')
                         sessionStorage.removeItem('viewItem')
                         navigate('/');
                         window.location.reload()
                        }}>로그아웃</button>
                    </li>
                </>
                )}
            </ul>
        </div>
    </div>
    </div>
  )
}

export default Header