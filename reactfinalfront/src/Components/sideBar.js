import React from 'react'
import '../assets/styles/sideBar.css'
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import axios from 'axios';
function Sidebar({ isOpen, onClose }) {
    const {cartItemCount, userName,userId } = useContext(AuthContext);
    const handleLogout = () => {
        if (userId) {
          axios.get(`http://127.0.0.1:8000/api/user/logout/${userId}/`)
            .then(() => {
              console.log("Logout successful");
             
            
            })
            .catch(error => {
              console.error("Error logging out:", error);
            });
        }
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('userName')
        window.location.reload();
        
      };
  return (
    
    <>
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2></h2>
      <div className='d-flex justify-content-center'>
        <p className='text-center fw-bold btn btn-outline-dark'>{userName}</p>
      </div>
      <ul>
        
        <li className='text-center'>
            <a  href='/'>Home</a>
        </li>
        <li className='text-center'>
            <a  href='/updateuser'>Update Profile</a>
        </li>
        <li className='text-center'>
            <a href='/allproducts'>All Products</a>
        </li>
        <li className='text-center'>
            <a href='/aboutus'>About Us</a>
        </li>
        <li className='text-center'>
            <a href='/contact'>Contact</a>
        </li>
        {userId && (
            <li className='text-center'>
              <a href='/myorder'>My Orders</a>
            </li>
          )}
        
        
      </ul>
      <button onClick={handleLogout} className='btn btn-outline-dark fw-bold'>Logout</button>
      <button className='btn btn-outline-dark fw-bold' onClick={onClose}>Close Sidebar</button>
    </div>
    </>
  )
}

export default Sidebar