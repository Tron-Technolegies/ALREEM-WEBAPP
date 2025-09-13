import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const Layout = () => {
  return (
    <div className="layout-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#fff', borderRight: '1px solid #ddd' }}>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Navbar */}
        <div style={{ height: '60px', borderBottom: '1px solid #ddd', background: '#fff' }}>
          <Navbar />
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#f9f9f9' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
