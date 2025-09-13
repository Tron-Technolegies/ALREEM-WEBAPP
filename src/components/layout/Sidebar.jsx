import React, { useState } from "react";
import "../layout/Sidebar.css";
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

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("Members");

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img src={sidebarlogo} alt="" />
      </div>

      <div className="sidebar-menus">
        <div
          className={`menu-box ${activeMenu === "Dashboard" ? "active" : ""}`}
          onClick={() => handleMenuClick("Dashboard")}
        >
          <IoHomeOutline className="menu-icon" />
          <span className="menu-text">Dashboard</span>
        </div>

        <div
          className={`menu-box ${activeMenu === "Members" ? "active" : ""}`}
          onClick={() => handleMenuClick("Members")}
        >
          <FaRegUser className="menu-icon" />
          <span className="menu-text">Members</span>
        </div>

        <div
          className={`menu-box ${
            activeMenu === "Trainers & Staffs" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Trainers & Staffs")}
        >
          <LuUsers className="menu-icon" />
          <span className="menu-text">Trainers & Staffs</span>
        </div>

        <div
          className={`menu-box ${activeMenu === "Calendar" ? "active" : ""}`}
          onClick={() => handleMenuClick("Calendar")}
        >
          <FaCalendar className="menu-icon" />
          <span className="menu-text">Calendar</span>
        </div>

        <div
          className={`menu-box ${activeMenu === "Attendance" ? "active" : ""}`}
          onClick={() => handleMenuClick("Attendance")}
        >
          <IoFingerPrint className="menu-icon" />
          <span className="menu-text">Attendance</span>
        </div>

        <div
          className={`menu-box ${activeMenu === "Invoice" ? "active" : ""}`}
          onClick={() => handleMenuClick("Invoice")}
        >
          <RiPieChart2Fill className="menu-icon" />
          <span className="menu-text">Invoice</span>
        </div>

        <div
          className={`menu-box ${activeMenu === "Pending" ? "active" : ""}`}
          onClick={() => handleMenuClick("Pending")}
        >
          <HiClock className="menu-icon" />
          <span className="menu-text">Pending</span>
        </div>

        <div
          className={`menu-box ${activeMenu === "Expired" ? "active" : ""}`}
          onClick={() => handleMenuClick("Expired")}
        >
          <MdOutlineWarning className="menu-icon" />
          <span className="menu-text">Expired</span>
        </div>

        <div
          className={`menu-box ${activeMenu === "Settings" ? "active" : ""}`}
          onClick={() => handleMenuClick("Settings")}
        >
          <IoMdSettings className="menu-icon" />
          <span className="menu-text">Settings</span>
        </div>
      </div>

      <div className="sidebar-logout">
        <div className="menu-box logout">
          <TbLogout className="menu-icon" />
          <span className="menu-text">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
