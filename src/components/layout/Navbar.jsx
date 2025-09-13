import React from 'react';
import "../layout/Navbar.css"
import { IoNotifications } from "react-icons/io5";
import { FaUserAlt, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className="nav-left-side">
        <h2>Dashboard</h2>
      </div>
      
      <div className="nav-right-side">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="search" 
            placeholder="Search any keywords" 
            className="search-input"
          />
        </div>
        
        <div className="notification-container">
          <IoNotifications className="notification-icon"/>
          <span className="notification-badge">4</span>
        </div>
        
        <div className="user-avatar">
          <FaUserAlt className="user-icon"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar