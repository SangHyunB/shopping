import React from 'react'
import "./Header.css"
import {Bag}  from 'react-bootstrap-icons';
import { Link } from 'react-router-dom'

function Header() {
 
  return (
    <div className='header'>
    <div className='contents'>
    <Bag className='bag'/>
        <div className='LOGO'>
            SSHOP
        </div>
        <nav className='navigate'>
            <ul>
                <li className='menu_1'>
                    메뉴1
                </li>

                <li className='menu_2'>
                    메뉴2
                </li>

                <li className='login'>
                    <Link className='loginLink' to={'/login'}>로그인</Link>
                </li>

                <li className='signup'>
                    <Link className='signupLink' to={'/signup'}>회원가입</Link>
                </li>
            </ul>
        </nav>
    </div>
    </div>
  )
}

export default Header