import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isIdAvailable, setIsIdAvailable] = useState(true);
  const [idCheckMessage, setIdCheckMessage] = useState('');
  const navigate = useNavigate();

  const checkIdAvailability = async (userId) => {
    try {
      const response = await fetch('http://localhost:3003/api/check-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userId }),
      });

      const result = await response.json();
      if (result.available) {
        setIsIdAvailable(true);
        setIdCheckMessage('사용 가능한 아이디입니다.');
      } else {
        setIsIdAvailable(false);
        setIdCheckMessage('이미 존재하는 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 체크 중 에러 발생:', error);
      setIdCheckMessage('아이디 중복 체크 중 에러가 발생했습니다.');
    }
  };

  const handleIdChange = (e) => {
    const newId = e.target.value;
    setId(newId);
    if (newId) {
      checkIdAvailability(newId);
    } else {
      setIdCheckMessage('');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (isIdAvailable) {
      try {
        const response = await fetch('http://localhost:3003/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, password }),
        });
        if (response.status === 201) {
         
          alert("회원가입성공");
          navigate('/'); // 홈 페이지로 리다이렉트
        } else {
          const result = await response.json();
          alert(result.message);
        
        }
      } catch (error) {
        console.error('회원가입 중 에러 발생:', error);;
      }
    } else {
      alert('사용할 수 없는 아이디입니다.');
    }
  };

  return (
    <div className="auth-container">
      <h2>회원가입</h2>
      <form>
        <div className="form-group">
          <label>아이디:</label>
          <input
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={handleIdChange}
          />
          <p>{idCheckMessage}</p>
        </div>
        <div className="form-group">
          <label>비밀번호:</label>
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleSignup}>회원가입</button>
      </form>
    </div>
  );
}

export default Signup;
