import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './sidebar.css';

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate()

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    // navigate to routes for Cabel management
    if (menu === 'dashboard') navigate('/cabel')
    if (menu === 'customers') navigate('/cabel/customers')
    if (menu === 'plans') navigate('/cabel/plans')
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-section">
          <span className="logo-icon">📊</span>
          <h2>Cabel Services</h2>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li
            className={`menu-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleMenuClick('dashboard')}
          >
            <span className="menu-icon">📈</span>
            <span className="menu-label">Dashboard</span>
          </li>

          <li
            className={`menu-item ${activeMenu === 'customers' ? 'active' : ''}`}
            onClick={() => handleMenuClick('customers')}
          >
            <span className="menu-icon">👥</span>
            <span className="menu-label">Customers</span>
          </li>

          <li
            className={`menu-item ${activeMenu === 'plans' ? 'active' : ''}`}
            onClick={() => handleMenuClick('plans')}
          >
            <span className="menu-icon">📋</span>
            <span className="menu-label">Plans</span>
          </li>
        </ul>
      </nav>

      <div className="sidebar-content">
        {activeMenu === 'customers' && (
          <div className="content-section">
            <h3>Customers</h3>
            <ul className="content-list">
              <li>View All Customers</li>
              <li>Add New Customer</li>
              <li>Customer Reports</li>
              <li>Customer History</li>
            </ul>
          </div>
        )}

        {activeMenu === 'plans' && (
          <div className="content-section">
            <h3>Plans</h3>
            <ul className="content-list">
              <li>View Plans</li>
              <li>Create New Plan</li>
              <li>Plan Templates</li>
              <li>Plan Settings</li>
            </ul>
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <div className="footer-item">
          <span className="footer-label">Version</span>
          <span className="footer-value">1.0.0</span>
        </div>
      </div>
    </aside>
  );
}
