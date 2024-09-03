import React,{useEffect,useState} from 'react'
import ex from '../main/picture/샌즈.jpg'
import './UserProfile.css'

function Profile() {
  const [user,setUser] = useState('');

  useEffect(()=>{
    setUser(localStorage.getItem('user'));
  },[])
  localStorage.getItem('userId');
  return (
    <div className="user-profile">
      <div className="profile-image-container">
        <img src={ex} alt={`${user}'s profile`} className="profile-image" />
      </div>
      <div className="user-info">
        <h2 className="user-name">{user}</h2>
        <p className="user-email">{user}@gmail.com</p>
      </div>
    </div>
    
  )
}

export default Profile