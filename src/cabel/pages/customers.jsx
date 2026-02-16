import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import './customers.css';
import api from '../../api';

export default function Customers({ onNavigate }) {
  const [showCustomers, setShowCustomers] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'pending', 'add'
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Basic'
  });

  const plans = ['Basic', 'Professional', 'Enterprise'];
  const planPrices = {
    'Basic': 200,
    'Professional': 500,
    'Enterprise': 1200
  };

  // Filter customers based on search and active tab
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

  // Add new customer
  const handleAddCustomer = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill all fields');
      return;
    }

    const payload = {
      customer_code: `CABL${Date.now()}`,
      name: formData.name,
      address: '',
      phone: formData.phone,
      plan: formData.plan,
      connected_on: new Date().toISOString().split('T')[0]
    };

    api.createCabelCustomer(payload).then((res) => {
      // append returned id and local fields
      setCustomers([...
        customers,
        { id: res.id, name: formData.name, email: formData.email, phone: formData.phone, plan: formData.plan, status: 'Active', joinDate: payload.connected_on, paymentStatus: 'Pending', amount: planPrices[formData.plan] }
      ]);
    }).catch((err) => {
      console.error(err);
      alert('Failed to add customer');
    });
    setFormData({ name: '', email: '', phone: '', plan: 'Basic' });
    setShowModal(false);
    alert('Customer added successfully!');
  };

  useEffect(() => {
    let mounted = true;
    api.getCabelCustomers().then((data) => {
      if (!mounted) return;
      setCustomers(data || []);
    }).catch((err) => console.error(err));
    return () => { mounted = false };
  }, []);

  // Delete customer
  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  // Change customer plan
  const handleChangePlan = (customer) => {
    setSelectedCustomer(customer);
    setShowPlanModal(true);
  };

  // Update plan
  const handleUpdatePlan = (newPlan) => {
    setCustomers(
      customers.map(c =>
        c.id === selectedCustomer.id
          ? { ...c, plan: newPlan, amount: planPrices[newPlan] }
          : c
      )
    );
    setShowPlanModal(false);
    setSelectedCustomer(null);
    alert('Plan updated successfully!');
  };

  // Update payment status
  const handleUpdatePaymentStatus = (id, status) => {
    api.updateCabelPaymentStatus(id, status).then((res) => {
      setCustomers(
        customers.map(c =>
          c.id === id ? { ...c, payment_status: status, paymentStatus: status } : c
        )
      );
    }).catch((err) => {
      console.error(err);
      alert('Failed to update payment status');
    });
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
                <h1>Customers Management</h1>
                <p>Manage all your customers, view pending payments, and update plans</p>
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
                      <td className="amount">{`₹${customer.amount}`}</td>
                      <td>{new Date(customer.joinDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${customer.status.toLowerCase()}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td>
                        <select
                          className={`payment-status-select ${(customer.payment_status || customer.paymentStatus || 'Pending').toLowerCase()}`}
                          value={customer.payment_status || customer.paymentStatus || 'Pending'}
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
              <h2>Add New Customer</h2>
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
                      {plan} - ₹{planPrices[plan]}
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
              <p>Current Plan: <strong>{selectedCustomer.plan}</strong></p>
              <p>Select a new plan:</p>
              <div className="plan-options">
                {plans.map(plan => (
                  <button
                    key={plan}
                    className={`plan-option ${selectedCustomer.plan === plan ? 'current' : ''}`}
                    onClick={() => handleUpdatePlan(plan)}
                  >
                    <div className="plan-name">{plan}</div>
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
