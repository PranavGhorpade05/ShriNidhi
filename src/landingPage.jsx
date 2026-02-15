import { MdTv, MdWifi } from 'react-icons/md';
import { useNavigate } from 'react-router-dom'
import './landingPage.css';

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      <div className="landing-header">
        <h1>Welcome to Shri Shri Nidhi</h1>
        <p>Select an option below to get started</p>
      </div>

      <div className="cards-container">
        <div className="card" onClick={() => navigate('/cabel')}>
          <div className="card-icon">
            <MdTv size={50}/>
          </div>
          <h2>Cabel Management</h2>
          <p>
           Manage channel packages, outages and equipments.
          </p>
          <button className="card-button">View</button>
        </div>

        {/* Card 2: Wi-Fi Management */}
        <div className="card" onClick={() => navigate('/wifi')}>
          <div className="card-icon">
            <MdWifi size={50}/>
          </div>
          <h2>Wi-Fi Management</h2>
          <p>
            Moniter bandwidth, connection status, and fiber nodes.
          </p>
          <button className="card-button">View</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;