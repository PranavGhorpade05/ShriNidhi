const API_BASE = (import.meta.env && import.meta.env.VITE_API_URL) || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

// Cabel
export function getCabelCustomers() { return request('/cabel/customers'); }
export function createCabelCustomer(data) { return request('/cabel/customers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); }

// Wifi
export function getWifiCustomers() { return request('/wifi/customers'); }
export function createWifiCustomer(data) { return request('/wifi/customers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); }
export function getWifiPlans() { return request('/wifi/plans'); }
export function createWifiPlan(data) { return request('/wifi/plans', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); }

export function getCabelSummary() { return request('/cabel/summary'); }
export function getWifiSummary() { return request('/wifi/summary'); }

// single default export combining named functions
const _default = {
  getCabelCustomers,
  createCabelCustomer,
  getWifiCustomers,
  createWifiCustomer,
  getWifiPlans,
  createWifiPlan,
  getCabelSummary,
  getWifiSummary
};

export default _default;
