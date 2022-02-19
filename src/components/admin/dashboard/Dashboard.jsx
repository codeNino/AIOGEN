import { useHookstate } from '@hookstate/core';
import { page, nav } from '../../../services/store';

import Sidebar from '../global/sidebar/Sidebar';
import './Dashboard.css';
import gmail from '../../../assets/images/icons/gmail.png';
import outlook from '../../../assets/images/icons/outlook.png';
import yahoo from '../../../assets/images/icons/yahoo.png';
import adidas from '../../../assets/images/icons/adidas.png';
import nike from '../../../assets/images/icons/nike.png';
import amazon from '../../../assets/images/icons/amazon.png';

const Dashboard = () => {

  const newPage = useHookstate(page);
  const navPull = useHookstate(nav);
  newPage.set("dashboard");
  // navPull.set(false);

  return (
    <div id="dashboard">
      <Sidebar />
      <div className="dashboard-div">
        <button className="menu-btn" onClick={() => navPull.set(!navPull.get())}>
          <i className={navPull.get() == false ? "ri-menu-line" : "ri-close-line"}></i>
        </button>
        <div className="pane">
        <h6>Select the account you want to create here</h6>
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-4">
                <div className="icon">
                  <img src={gmail} alt="" />
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <img src={outlook} alt="" />
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <img src={yahoo} alt="" />
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <img src={adidas} alt="" />
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <img src={nike} alt="" />
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <img src={amazon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
