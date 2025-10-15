import React, { useState } from "react";
import "./Sidebar.css";
import sidebarlogo from "../../../public/logos/alreem-logo.png";
import API from "../../utils/api";

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
import { AiOutlineBranches } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const navigate = useNavigate();

  // Highlight the active menu item
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  // Logout function
  const logout = () => {
    API.post("/members/admin_logout").then((res) => {
      if (res.data.status === "success") {
        // 1. Clear tokens
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // 2. Clear JWT cookie (if stored in cookie)
        document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // 3. Prevent back navigation (disable browser cache)
        window.history.pushState(null, "", "/");
        window.onpopstate = function () {
          //window.onpopstate handler — so pressing the back button forces redirection to login.
          navigate("/", { replace: true }); //replace: true ensures React Router replaces history (no backward navigation).
        };

        // 4. Redirect safely
        navigate("/", { replace: true });
      } else {
        console.error("Logout failed:", res.data.message);
      }
    });
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

        <Link
          to="/branches"
          className={`menu-box ${activeMenu === "Branches" ? "active" : ""}`}
          onClick={() => handleMenuClick("Branches")}
        >
          <AiOutlineBranches className="menu-icon" />
          <span className="menu-text">Branches</span>
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
        <Link
          to="/pending"
          className={`menu-box ${activeMenu === "Pending" ? "active" : ""}`}
          onClick={() => handleMenuClick("Pending")}
        >
          <HiClock className="menu-icon" />
          <span className="menu-text">Pending</span>
        </Link>

        <Link
          to="/expired"
          className={`menu-box ${activeMenu === "Expired" ? "active" : ""}`}
          onClick={() => handleMenuClick("Expired")}
        >
          <MdOutlineWarning className="menu-icon" />
          <span className="menu-text">Expired</span>
        </Link>

        <Link
          to="/add/branch/admin"
          className={`menu-box ${activeMenu === "Settings" ? "active" : ""}`}
          onClick={() => handleMenuClick("Settings")}
        >
          <IoMdSettings className="menu-icon" />
          <span className="menu-text">Branch Admin</span>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="sidebar-logout" onClick={logout}>
        <div className="menu-box logout">
          <TbLogout className="menu-icon" />
          <span className="menu-text">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
