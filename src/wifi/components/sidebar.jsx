import React, { useState } from 'react';
import './sidebar.css';

export default function Sidebar({ onNavigate }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (onNavigate) {
      onNavigate(menu);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-section">
          <span className="logo-icon">�</span>
          <h2>WiFi Services</h2>
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
            <span className="menu-icon">�️</span>
            <span className="menu-label">Coverage Zones</span>
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
            <h3>Coverage Zones</h3>
            <ul className="content-list">
              <li>North Zone</li>
              <li>Central Zone</li>
              <li>South Zone</li>
              <li>Zone Settings</li>
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
