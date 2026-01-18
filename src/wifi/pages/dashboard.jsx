import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import './dashboard.css';

export default function Dashboard({ onNavigate }) {
  // Sample data
  const [showDashboard, setShowDashboard] = useState(true);
  const [analytics] = useState({
    totalConnections: 1850,
    totalConnectionsGrowth: '+15%',
    activeUsers: 1250,
    activeUsersGrowth: '+8%',
    totalBandwidth: '2.5 TB',
    bandwidthGrowth: '+22%',
    uptime: '99.8%',
    uptimeGrowth: '+0.2%',
    nodes: [
      { name: 'North Zone', connections: 450, percentage: 24, color: '#3b82f6', growth: '+12%' },
      { name: 'Central Zone', connections: 780, percentage: 42, color: '#8b5cf6', growth: '+18%' },
      { name: 'South Zone', connections: 620, percentage: 34, color: '#06b6d4', growth: '+10%' }
    ]
  });

  return (
    <div className="dashboard-wrapper">
      <Sidebar onNavigate={onNavigate} />
      
      {showDashboard && (
        <div className="dashboard-content">
          <div className="dashboard-header">
            <div>
              <h1>WiFi Network Dashboard</h1>
              <p>Monitor your network performance and connections in real-time</p>
            </div>
          </div>

          {/* Metrics Section */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon total-connections">📡</span>
                <div className="metric-label-group">
                  <h3>Total Connections</h3>
                  <span className="growth-badge positive">
                    {analytics.totalConnectionsGrowth} this month
                  </span>
                </div>
              </div>
              <div className="metric-value">{analytics.totalConnections}</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon active-users">👥</span>
                <div className="metric-label-group">
                  <h3>Active Users</h3>
                  <span className="growth-badge positive">
                    {analytics.activeUsersGrowth} this month
                  </span>
                </div>
              </div>
              <div className="metric-value">{analytics.activeUsers}</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon bandwidth">🌐</span>
                <div className="metric-label-group">
                  <h3>Total Bandwidth</h3>
                  <span className="growth-badge positive">
                    {analytics.bandwidthGrowth} this month
                  </span>
                </div>
              </div>
              <div className="metric-value">{analytics.totalBandwidth}</div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon uptime">⚡</span>
                <div className="metric-label-group">
                  <h3>Network Uptime</h3>
                  <span className="growth-badge positive">
                    {analytics.uptimeGrowth} this month
                  </span>
                </div>
              </div>
              <div className="metric-value">{analytics.uptime}</div>
            </div>
          </div>

          {/* Zone Distribution Section */}
          <div className="section-container">
            <div className="section-header">
              <div>
                <h2>Connections by Zone</h2>
                <p>Distribution and performance across coverage zones</p>
              </div>
            </div>

            <div className="plans-grid">
              {analytics.nodes.map((node, index) => (
                <div key={index} className="plan-card">
                  <div className="plan-header">
                    <h3>{node.name}</h3>
                    <span className="growth-badge positive">{node.growth}</span>
                  </div>
                  <div className="plan-stats">
                    <div className="stat-item">
                      <span className="stat-label">Connections</span>
                      <span className="stat-value">{node.connections}</span>
                    </div>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${node.percentage}%`, 
                          backgroundColor: node.color 
                        }}
                      ></div>
                    </div>
                    <span className="percentage">{node.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Section */}
          <div className="section-container">
            <div className="section-header">
              <h2>Network Status Summary</h2>
            </div>
            <div className="status-grid">
              <div className="status-card online">
                <div className="status-header">
                  <span className="status-icon">✓</span>
                  <h3>Online</h3>
                </div>
                <div className="status-value">1,850</div>
                <div className="status-label">Connected Devices</div>
              </div>
              <div className="status-card warning">
                <div className="status-header">
                  <span className="status-icon">⚠</span>
                  <h3>Degraded</h3>
                </div>
                <div className="status-value">45</div>
                <div className="status-label">Low Signal Zones</div>
              </div>
              <div className="status-card offline">
                <div className="status-header">
                  <span className="status-icon">✕</span>
                  <h3>Offline</h3>
                </div>
                <div className="status-value">12</div>
                <div className="status-label">Disconnected Devices</div>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="section-container">
            <div className="section-header">
              <h2>Network Insights</h2>
            </div>
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">📊</span>
                  <h3>Peak Usage Time</h3>
                </div>
                <div className="insight-value">6:00 PM - 9:00 PM</div>
                <div className="insight-description">Highest bandwidth consumption</div>
              </div>
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">🚀</span>
                  <h3>Avg Speed</h3>
                </div>
                <div className="insight-value">85 Mbps</div>
                <div className="insight-description">Average download speed</div>
              </div>
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">🔧</span>
                  <h3>Maintenance</h3>
                </div>
                <div className="insight-value">None Scheduled</div>
                <div className="insight-description">All systems operational</div>
              </div>
              <div className="insight-card">
                <div className="insight-header">
                  <span className="insight-icon">📈</span>
                  <h3>Growth Rate</h3>
                </div>
                <div className="insight-value">+15% YoY</div>
                <div className="insight-description">Year over year connection growth</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
