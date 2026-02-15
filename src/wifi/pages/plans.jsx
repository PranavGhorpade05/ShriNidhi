import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar';
import './customers.css';
import api from '../../api';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ name: '', speed: '', price: '' });

  useEffect(() => {
    let mounted = true;
    api.getWifiPlans().then((data) => { if (!mounted) return; setPlans(data || []); }).catch(console.error);
    return () => { mounted = false };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert('Name and price required');
    api.createWifiPlan({ name: form.name, speed: form.speed, price: Number(form.price) })
      .then((res) => {
        setPlans([ ...plans, { id: res.id, name: form.name, speed: form.speed, price: Number(form.price) } ]);
        setForm({ name: '', speed: '', price: '' });
      })
      .catch((err) => { console.error(err); alert('Failed to create plan'); });
  };

  return (
    <div className="customers-wrapper">
      <Sidebar onNavigate={onNavigate} />
      <div className="customers-content">
        <div className="customers-header">
          <div className="header-top">
            <div>
              <h1>WiFi Plans</h1>
              <p>Manage WiFi plans and pricing</p>
            </div>
          </div>
        </div>

        <div className="plans-list">
          <table className="customers-table">
            <thead>
              <tr><th>Name</th><th>Speed</th><th>Price</th></tr>
            </thead>
            <tbody>
              {plans.map(p => (
                <tr key={p.id}><td>{p.name}</td><td>{p.speed}</td><td>₹{p.price}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="add-plan-form">
          <h3>Add Plan</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Speed</label>
              <input value={form.speed} onChange={(e) => setForm({...form, speed: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} />
            </div>
            <div className="modal-actions">
              <button className="btn-submit" type="submit">Create Plan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
