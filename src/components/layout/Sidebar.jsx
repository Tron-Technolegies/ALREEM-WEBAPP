import React, { useState } from "react";
import "./Sidebar.css";
import sidebarlogo from "../../../public/logos/alreem-logo.png";

/*icons import*/
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { FaCalendar } from "react-icons/fa6";
import { IoFingerPrint } from "react-icons/io5";
import { RiPieChart2Fill } from "react-icons/ri";
import { HiClock } from "react-icons/hi2";
import { MdOutlineWarning } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { FaCrown } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const navigate = useNavigate();

  // Highlight the active menu item
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("https://alreem-7r91.onrender.com/members/admin_logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        //  Redirect user to login page after successful logout
        navigate("/");
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="sidebar-container">
      {/* Sidebar Logo */}
      <div className="sidebar-logo">
        <img src={sidebarlogo} alt="Logo" />
      </div>

      {/* Sidebar Menus */}
      <div className="sidebar-menus">
        <Link
          to="/dashboard"
          className={`menu-box ${activeMenu === "Dashboard" ? "active" : ""}`}
          onClick={() => handleMenuClick("Dashboard")}
        >
          <IoHomeOutline className="menu-icon" />
          <span className="menu-text">Dashboard</span>
        </Link>

        <Link
          to="/users"
          className={`menu-box ${activeMenu === "Members" ? "active" : ""}`}
          onClick={() => handleMenuClick("Members")}
        >
          <FaRegUser className="menu-icon" />
          <span className="menu-text">Members</span>
        </Link>

        <Link
          to="/view/staffs"
          className={`menu-box ${activeMenu === "Trainers & Staffs" ? "active" : ""}`}
          onClick={() => handleMenuClick("Trainers & Staffs")}
        >
          <LuUsers className="menu-icon" />
          <span className="menu-text">Trainers & Staffs</span>
        </Link>

        <Link
          to="/plans"
          className={`menu-box ${activeMenu === "Plans" ? "active" : ""}`}
          onClick={() => handleMenuClick("Plans")}
        >
          <FaCrown className="menu-icon" />
          <span className="menu-text">Plans</span>
        </Link>

        {/*
        <Link
          to="/attendance"
          className={`menu-box ${activeMenu === "Attendance" ? "active" : ""}`}
          onClick={() => handleMenuClick("Attendance")}
        >
          <IoFingerPrint className="menu-icon" />
          <span className="menu-text">Attendance</span>
        </Link>
        */}

        <Link
          to="/invoice"
          className={`menu-box ${activeMenu === "Invoice" ? "active" : ""}`}
          onClick={() => handleMenuClick("Invoice")}
        >
          <RiPieChart2Fill className="menu-icon" />
          <span className="menu-text">Invoice</span>
        </Link>

        {/* <Link to="/pending" className={menu-box ${activeMenu === "Pending" ? "active" : ""}}
         onClick={() => handleMenuClick("Pending")} > <HiClock className="menu-icon" /> <span className="menu-text">Pending</span> </Link> 
         <Link to="/expired" className={menu-box ${activeMenu === "Expired" ? "active" : ""}} onClick={() => handleMenuClick("Expired")} > <MdOutlineWarning className="menu-icon" /> <span className="menu-text">Expired</span> </Link>
          <Link to="/settings" className={menu-box ${activeMenu === "Settings" ? "active" : ""}} onClick={() => handleMenuClick("Settings")} > <IoMdSettings className="menu-icon" /> <span className="menu-text">Settings</span> </Link> */}
      </div>

      {/* Logout Button */}
      <div className="sidebar-logout" onClick={handleLogout}>
        <div className="menu-box logout">
          <TbLogout className="menu-icon" />
          <span className="menu-text">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
