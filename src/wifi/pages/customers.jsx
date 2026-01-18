import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import './customers.css';

export default function Customers({ onNavigate }) {
  const [showCustomers, setShowCustomers] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Temporary customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91-9876543210',
      plan: 'Premium',
      status: 'Active',
      joinDate: '2024-01-15',
      paymentStatus: 'Completed',
      amount: 800,
      bandwidth: '100 Mbps'
    },
    {
      id: 2,
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '+91-9876543211',
      plan: 'Elite',
      status: 'Active',
      joinDate: '2024-02-20',
      paymentStatus: 'Pending',
      amount: 1500,
      bandwidth: '500 Mbps'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit@example.com',
      phone: '+91-9876543212',
      plan: 'Standard',
      status: 'Active',
      joinDate: '2024-03-10',
      paymentStatus: 'Pending',
      amount: 400,
      bandwidth: '50 Mbps'
    },
    {
      id: 4,
      name: 'Neha Sharma',
      email: 'neha@example.com',
      phone: '+91-9876543213',
      plan: 'Premium',
      status: 'Inactive',
      joinDate: '2024-01-05',
      paymentStatus: 'Overdue',
      amount: 800,
      bandwidth: '100 Mbps'
    },
    {
      id: 5,
      name: 'Vikram Desai',
      email: 'vikram@example.com',
      phone: '+91-9876543214',
      plan: 'Standard',
      status: 'Active',
      joinDate: '2024-03-22',
      paymentStatus: 'Completed',
      amount: 400,
      bandwidth: '50 Mbps'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Standard'
  });

  const plans = ['Standard', 'Premium', 'Elite'];
  const planPrices = {
    'Standard': 400,
    'Premium': 800,
    'Elite': 1500
  };
  const planBandwidth = {
    'Standard': '50 Mbps',
    'Premium': '100 Mbps',
    'Elite': '500 Mbps'
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    if (activeTab === 'pending') {
      return matchesSearch && customer.paymentStatus === 'Pending';
    }
    return matchesSearch;
  });

  const handleAddCustomer = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all fields');
      return;
    }

    const newCustomer = {
      id: customers.length + 1,
      ...formData,
      status: 'Active',
      joinDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'Pending',
      amount: planPrices[formData.plan],
      bandwidth: planBandwidth[formData.plan]
    };

    setCustomers([...customers, newCustomer]);
    setFormData({ name: '', email: '', phone: '', plan: 'Standard' });
    setShowModal(false);
    alert('Customer added successfully!');
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleChangePlan = (customer) => {
    setSelectedCustomer(customer);
    setShowPlanModal(true);
  };

  const handleUpdatePlan = (newPlan) => {
    setCustomers(
      customers.map(c =>
        c.id === selectedCustomer.id
          ? { ...c, plan: newPlan, amount: planPrices[newPlan], bandwidth: planBandwidth[newPlan] }
          : c
      )
    );
    setShowPlanModal(false);
    setSelectedCustomer(null);
    alert('Plan updated successfully!');
  };

  const handleUpdatePaymentStatus = (id, status) => {
    setCustomers(
      customers.map(c =>
        c.id === id ? { ...c, paymentStatus: status } : c
      )
    );
  };

  return (
    <div className="customers-wrapper">
      <Sidebar onNavigate={onNavigate} />

      {showCustomers && (
        <div className="customers-content">
          {/* Header */}
          <div className="customers-header">
            <div className="header-top">
              <div>
                <h1>WiFi Customers Management</h1>
                <p>Manage all your WiFi customers, view pending payments, and update plans</p>
              </div>
              <button className="add-customer-btn" onClick={() => setShowModal(true)}>
                + Add Customer
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-label">Total Customers</div>
              <div className="stat-value">{customers.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending Payments</div>
              <div className="stat-value">{customers.filter(c => c.paymentStatus === 'Pending').length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Active Customers</div>
              <div className="stat-value">{customers.filter(c => c.status === 'Active').length}</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Customers ({customers.length})
              </button>
              <button
                className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Payments ({customers.filter(c => c.paymentStatus === 'Pending').length})
              </button>
            </div>

            {/* Search */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>

          {/* Customers Table */}
          <div className="customers-table-section">
            {filteredCustomers.length > 0 ? (
              <table className="customers-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Plan</th>
                    <th>Bandwidth</th>
                    <th>Amount</th>
                    <th>Join Date</th>
                    <th>Status</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map(customer => (
                    <tr key={customer.id} className={`customer-row ${customer.status.toLowerCase()}`}>
                      <td className="name-cell">
                        <div className="customer-avatar">{customer.name.charAt(0)}</div>
                        <span>{customer.name}</span>
                      </td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>
                        <span className="plan-badge">{customer.plan}</span>
                      </td>
                      <td>{customer.bandwidth}</td>
                      <td className="amount">{`₹${customer.amount}`}</td>
                      <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${customer.status.toLowerCase()}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className={`payment-status-select ${customer.paymentStatus.toLowerCase()}`}
                          value={customer.paymentStatus}
                          onChange={(e) => handleUpdatePaymentStatus(customer.id, e.target.value)}
                        >
                          <option value="Completed">Completed</option>
                          <option value="Pending">Pending</option>
                          <option value="Overdue">Overdue</option>
                        </select>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="action-btn plan-btn"
                          onClick={() => handleChangePlan(customer)}
                          title="Change Plan"
                        >
                          📋
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteCustomer(customer.id)}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-data">
                <p>No customers found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New WiFi Customer</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddCustomer} className="modal-form">
              <div className="form-group">
                <label>Customer Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Plan</label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({...formData, plan: e.target.value})}
                >
                  {plans.map(plan => (
                    <option key={plan} value={plan}>
                      {plan} - {planBandwidth[plan]} - ₹{planPrices[plan]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Plan Modal */}
      {showPlanModal && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Plan for {selectedCustomer.name}</h2>
              <button className="close-btn" onClick={() => setShowPlanModal(false)}>×</button>
            </div>
            <div className="modal-content">
              <p>Current Plan: <strong>{selectedCustomer.plan} ({selectedCustomer.bandwidth})</strong></p>
              <p>Select a new plan:</p>
              <div className="plan-options">
                {plans.map(plan => (
                  <button
                    key={plan}
                    className={`plan-option ${selectedCustomer.plan === plan ? 'current' : ''}`}
                    onClick={() => handleUpdatePlan(plan)}
                  >
                    <div className="plan-name">{plan}</div>
                    <div className="plan-bandwidth">{planBandwidth[plan]}</div>
                    <div className="plan-price">₹{planPrices[plan]}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
