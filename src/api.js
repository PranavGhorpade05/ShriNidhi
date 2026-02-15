// Minimal API stub for local development and testing
// Replace these implementations with real API calls when backend is available.

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

let cabelCustomers = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '+91-9876543210', plan: 'Professional', status: 'Active', joinDate: '2024-01-15', paymentStatus: 'Completed', amount: 500 }
];

let wifiCustomers = [
  { id: 1, name: 'Priya Singh', email: 'priya@example.com', phone: '+91-9876543211', plan: 'Premium', status: 'Active', joinDate: '2024-02-20', paymentStatus: 'Pending', amount: 800, bandwidth: '100 Mbps' }
];

let wifiPlans = [
  { id: 1, name: 'Standard', speed: '50 Mbps', price: 400 },
  { id: 2, name: 'Premium', speed: '100 Mbps', price: 800 },
  { id: 3, name: 'Elite', speed: '500 Mbps', price: 1500 }
];

export default {
  // Cabel
  async getCabelSummary() {
    await wait(100);
    return { totalCustomers: cabelCustomers.length, pendingInvoices: cabelCustomers.filter(c=>c.paymentStatus==='Pending').length, totalRevenue: cabelCustomers.reduce((s,c)=>s+(c.amount||0),0) };
  },
  async getCabelCustomers() {
    await wait(100);
    return cabelCustomers;
  },
  async createCabelCustomer(payload) {
    await wait(100);
    const id = Date.now();
    const saved = { id, ...payload };
    cabelCustomers.push(saved);
    return { id };
  },

  // WiFi
  async getWifiSummary() {
    await wait(100);
    return { totalConnections: wifiCustomers.length, activeUsers: wifiCustomers.filter(c=>c.status==='Active').length, totalBandwidth: 'N/A', uptime: '99.9%', nodes: [] };
  },
  async getWifiCustomers() {
    // Try real backend first (relative path). Fallback to local mock on error.
    try {
      const res = await fetch('/api/wifi/customers');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      return data;
    } catch (err) {
      await wait(100);
      return wifiCustomers;
    }
  },
  async createWifiCustomer(payload) {
    // POST to real backend (relative). Fallback to local mock on error.
    try {
      const res = await fetch('/api/wifi/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create customer');
      const created = await res.json();
      return created;
    } catch (err) {
      await wait(100);
      const id = Date.now();
      const customer = {
        id,
        name: payload.name,
        email: payload.email,
        phone: payload.contact_number || payload.phone || '',
        plan: payload.plan_name || payload.plan || 'Standard',
        joinDate: payload.registration_date || new Date().toISOString().split('T')[0],
        status: payload.status || 'Active',
        paymentStatus: payload.paymentStatus || 'Pending',
        amount: payload.amount || 0,
        bandwidth: payload.bandwidth || '',
        registration_date: payload.registration_date,
        renew_date: payload.renew_date,
        expiry_date: payload.expiry_date,
        city: payload.city,
        address: payload.address,
        zone_name: payload.zone_name,
        connection_type: payload.connection_type
      };
      wifiCustomers.push(customer);
      return customer;
    }
  },
  async getWifiPlans() {
    try {
      const res = await fetch('/api/wifi/plans');
      if (!res.ok) throw new Error('Failed to fetch plans');
      return await res.json();
    } catch (err) {
      await wait(80);
      return wifiPlans;
    }
  },
  async createWifiPlan(plan) {
    await wait(80);
    const id = Date.now();
    wifiPlans.push({ id, ...plan });
    return { id };
  }
}
