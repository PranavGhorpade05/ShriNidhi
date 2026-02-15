import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'

import LandingPage from './landingPage'
import CabelDashboard from './cabel/pages/dashboard'
import CabelCustomers from './cabel/pages/customers'
import WiFiDashboard from './wifi/pages/dashboard'
import WiFiCustomers from './wifi/pages/customers'
import WiFiPlans from './wifi/pages/plans'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/cabel">
        <Route index element={<CabelDashboard />} />
        <Route path="customers" element={<CabelCustomers />} />
      </Route>

      <Route path="/wifi">
        <Route index element={<WiFiDashboard />} />
        <Route path="customers" element={<WiFiCustomers />} />
        <Route path="zones" element={<WiFiPlans />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
