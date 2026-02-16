// API client for connecting to ShriNidhi backend
// All requests are proxied through Vite dev server to http://localhost:4000/api

const API_BASE = '/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP Error: ${response.status}`);
  }
  return response.json();
};

export default {
  // ===== CABEL APIs =====
  
  async getCabelSummary() {
    const response = await fetch(`${API_BASE}/cabel/summary`);
    return handleResponse(response);
  },

  async getCabelCustomers() {
    const response = await fetch(`${API_BASE}/cabel/customers`);
    return handleResponse(response);
  },

  async createCabelCustomer(payload) {
    const response = await fetch(`${API_BASE}/cabel/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async updateCabelCustomer(customerId, payload) {
    const response = await fetch(`${API_BASE}/cabel/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async updateCabelPaymentStatus(customerId, paymentStatus) {
    const response = await fetch(`${API_BASE}/cabel/customers/${customerId}/payment-status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_status: paymentStatus })
    });
    return handleResponse(response);
  },

  async getCabelInvoices(customerId) {
    const response = await fetch(`${API_BASE}/cabel/customers/${customerId}/invoices`);
    return handleResponse(response);
  },

  // ===== WiFi APIs =====

  async getWifiSummary() {
    const response = await fetch(`${API_BASE}/wifi/summary`);
    return handleResponse(response);
  },

  async getWifiCustomers() {
    const response = await fetch(`${API_BASE}/wifi/customers`);
    return handleResponse(response);
  },

  async createWifiCustomer(payload) {
    const response = await fetch(`${API_BASE}/wifi/customers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async getWifiPlans() {
    const response = await fetch(`${API_BASE}/wifi/plans`);
    return handleResponse(response);
  },

  async createWifiPlan(plan) {
    const response = await fetch(`${API_BASE}/wifi/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    });
    return handleResponse(response);
  },

  async updateWifiCustomer(customerId, payload) {
    const response = await fetch(`${API_BASE}/wifi/customers/${customerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(response);
  },

  async updateWifiPaymentStatus(customerId, paymentStatus) {
    const response = await fetch(`${API_BASE}/wifi/customers/${customerId}/payment-status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_status: paymentStatus })
    });
    return handleResponse(response);
  },

  // ===== AUTH APIs (if needed) =====

  async register(credentials) {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  async login(credentials) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  }
}
