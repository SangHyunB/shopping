import React, { useState } from 'react';
import './auth.css';
import { useNavigate } from 'react-router-dom';



function Login() {
  const [id,setId]=useState('');
  const [password,setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token,setToken] = useState('');
  const navigate = useNavigate();


  const handleLogin = async(e)=>{
    e.preventDefault(); 
    const response = await fetch('http://localhost:3003/api/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, password }),
    })

    const data = await response.json();
    if (response.ok) {
      console.log(data);
      setMessage(data.message);
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('user',data.userName);
      setToken(data.token);
      navigate('/');
      window.location.reload()
    
    } else {
      setMessage(data.message);
      alert(data.message);
    }
  }


  
  return (
    <div className="auth-container">
    <h2>로그인</h2>
    <form>
      <div className="form-group">
        <label>아이디:</label>
        <input 
        type="text" 
        placeholder="ID 입력"
        value={id}
        onChange={(e)=>setId(e.target.value)} />
      </div>
      <div className="form-group">
        <label>비밀번호:</label>
        <input 
        type="password" 
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}  />
      </div>
      <button className="btn" onClick={handleLogin}>로그인</button>
    </form>
  </div>
  )
}

export default Login