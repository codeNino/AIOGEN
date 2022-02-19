import { useHookstate } from '@hookstate/core';
import { page, nav } from '../../../services/store';

import Sidebar from '../global/sidebar/Sidebar';
import './Settings.css';

const Settings = () => {

  const newPage = useHookstate(page);
  const navPull = useHookstate(nav);
  newPage.set("settings");
  navPull.set(false);

  return (
    <div id="settings">
      <Sidebar />
      <div className="settings-div">
        <button className="menu-btn" onClick={() => navPull.set(!navPull.get())}>
          <i className={navPull.get() == false ? "ri-menu-line" : "ri-close-line"}></i>
        </button>
        <div className="container">
          <div className="settings-title">
            <h5>Settings</h5>
          </div>
          <form action="#" className="fields">
            <label>Discord webhook URL</label>
            <input type="text" />
            <label>Discord webhook Username</label>
            <input type="text" />
            <label>SMS-Active.ru API Key</label>
            <input type="text" />
            <label>Proxies</label>
            <textarea></textarea>
            <div className="btn-div">
              <button className="btn btn-success px-5 mt-3">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Settings
