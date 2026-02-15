import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import './dashboard.css';
import api from '../../api';

export default function Dashboard({ onNavigate }) {
  // Sample data
  const [showDashboard, setShowDashboard] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalCustomers: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    plans: []
  });

  useEffect(() => {
    let mounted = true;
    api.getCabelSummary().then((data) => {
      if (!mounted) return;
      setAnalytics((prev) => ({ ...prev, totalCustomers: data.totalCustomers || 0, pendingPayments: data.pendingInvoices || 0, totalRevenue: data.totalRevenue || 0 }));
    }).catch((err) => console.error(err));
    return () => { mounted = false };
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar onNavigate={onNavigate} />
      
      {showDashboard && (
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div className="header-top">
              <div>
                <h1>Customer Analytics</h1>
                <p>Real-time insights into your customer base and revenue metrics</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="metrics-container">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon total-customers">👥</span>
                <div className="metric-label-group">
                  <h3>Total Customers</h3>
                  <span className="growth-badge positive">
                    {analytics.totalCustomersGrowth} this month
                  </span>
                </div>
              </div>
              <div className="metric-value">{analytics.totalCustomers}</div>
              <p className="metric-subtitle">Active customers in system</p>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon pending-payments">💳</span>
                <div className="metric-label-group">
                  <h3>Pending Payments</h3>
                  <span className="growth-badge negative">
                    {analytics.pendingPaymentsGrowth} this month
                  </span>
                </div>
              </div>
              <div className="metric-value alert">{analytics.pendingPayments}</div>
              <p className="metric-subtitle">Awaiting customer payment</p>
            </div>
          </div>

          {/* Plans Distribution */}
          <div className="plans-section">
            <div className="section-header">
              <div>
                <h2>Customers by Plan</h2>
                <p>Distribution and performance across subscription tiers</p>
              </div>
            </div>

            <div className="plans-grid">
              {analytics.plans.map((plan, index) => (
                <div key={index} className="plan-card">
                  <div className="plan-top">
                    <div className="plan-header">
                      <h3>{plan.name}</h3>
                      <span className="plan-growth">{plan.growth}</span>
                    </div>
                    <span className="plan-count">{plan.count}</span>
                  </div>

                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${plan.percentage}%`,
                        backgroundColor: plan.color 
                      }}
                    ></div>
                  </div>

                  <div className="plan-stats">
                    <div className="stat-item">
                      <span className="percentage">{plan.percentage}%</span>
                      <span className="stat-label">of total</span>
                    </div>
                    <div className="stat-item">
                      <span className="percentage">{plan.count}</span>
                      <span className="stat-label">customers</span>
                    </div>
                  </div>

                  <button className="plan-button" style={{ borderColor: plan.color }}>
                    View Plan Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Section */}
          <div className="activity-section">
            <div className="section-header">
              <div>
                <h2>Payment Status Summary</h2>
                <p>Overview of transaction health and payment compliance</p>
              </div>
            </div>

            <div className="status-grid">
              <div className="status-card completed">
                <div className="status-icon">✓</div>
                <div className="status-number">1,205</div>
                <div className="status-label">Completed</div>
                <div className="status-description">Successful transactions</div>
              </div>
              <div className="status-card pending">
                <div className="status-icon">⏳</div>
                <div className="status-number">45</div>
                <div className="status-label">Pending</div>
                <div className="status-description">Awaiting confirmation</div>
              </div>
              <div className="status-card overdue">
                <div className="status-icon">⚠</div>
                <div className="status-number">8</div>
                <div className="status-label">Overdue</div>
                <div className="status-description">Requires attention</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
