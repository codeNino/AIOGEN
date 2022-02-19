import { useHookstate } from '@hookstate/core';
import { page, nav } from '../../../services/store';

import Sidebar from '../global/sidebar/Sidebar';
import './Accounts.css';

import gmail from '../../../assets/images/icons/gmail.png';
import outlook from '../../../assets/images/icons/outlook.png';
import yahoo from '../../../assets/images/icons/yahoo.png';
import adidas from '../../../assets/images/icons/adidas.png';
import nike from '../../../assets/images/icons/nike.png';
import amazon from '../../../assets/images/icons/amazon.png';

const Account = () => {

  const newPage = useHookstate(page);
  const navPull = useHookstate(nav);
  newPage.set("accounts");
  // navPull.set(false);

  return (
    <div id="account">
      <Sidebar />
      <div className="account-div">
        <button className="menu-btn" onClick={() => navPull.set(!navPull.get())}>
          <i className={navPull.get() == false ? "ri-menu-line" : "ri-close-line"}></i>
        </button>
        <div className="pane">
        {/* <h6>Select the account you want to create here</h6> */}
          <div className="container">
            <div className="row">
              <div className="col-6 col-md-4">
                <div className="icon">
                  <div className="details">
                    <h6>Gmail</h6>
                    <span>12</span>
                  </div>
                  <div className="image">
                    <img src={gmail} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <div className="details">
                    <h6>Outlook</h6>
                    <span>17</span>
                  </div>
                  <div className="image">
                    <img src={outlook} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <div className="details">
                    <h6>Yahoo</h6>
                    <span>16</span>
                  </div>
                  <div className="image">
                    <img src={yahoo} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <div className="details">
                    <h6>Adidas</h6>
                    <span>17</span>
                  </div>
                  <div className="image">
                    <img src={adidas} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <div className="details">
                    <h6>Nike</h6>
                    <span>12</span>
                  </div>
                  <div className="image">
                    <img src={nike} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="icon">
                  <div className="details">
                    <h6>Amazon</h6>
                    <span>7</span>
                  </div>
                  <div className="image">
                    <img src={amazon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
