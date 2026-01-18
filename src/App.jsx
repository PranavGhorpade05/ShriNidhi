import { useState } from 'react'
import LandingPage from './landingPage'
import CabelDashboard from './cabel/pages/dashboard'
import CabelCustomers from './cabel/pages/customers'
import WiFiDashboard from './wifi/pages/dashboard'
import WiFiCustomers from './wifi/pages/customers'
import './App.css'

function App() {
  const [currentService, setCurrentService] = useState('landing') // 'landing', 'cabel', 'wifi'
  const [currentPage, setCurrentPage] = useState('dashboard') // 'dashboard', 'customers', 'plans', 'zones'

  const handleServiceSelection = (service) => {
    setCurrentService(service)
    setCurrentPage('dashboard')
  }

  const handleNavigation = (menu) => {
    setCurrentPage(menu)
  }

  return (
    <>
      {currentService === 'landing' && (
        <LandingPage onSelectService={handleServiceSelection} />
      )}
      
      {/* Cabel Management Pages */}
      {currentService === 'cabel' && currentPage === 'dashboard' && (
        <CabelDashboard onNavigate={handleNavigation} />
      )}
      
      {currentService === 'cabel' && currentPage === 'customers' && (
        <CabelCustomers onNavigate={handleNavigation} />
      )}

      {/* WiFi Management Pages */}
      {currentService === 'wifi' && currentPage === 'dashboard' && (
        <WiFiDashboard onNavigate={handleNavigation} />
      )}
      
      {currentService === 'wifi' && currentPage === 'customers' && (
        <WiFiCustomers onNavigate={handleNavigation} />
      )}
    </>
  )
}

export default App
