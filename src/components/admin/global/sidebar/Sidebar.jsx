import { Link } from 'react-router-dom';
import { useHookstate } from '@hookstate/core';
import { page, nav } from '../../../../services/store';
import './Sidebar.css';
import logo from '../../../../assets/images/logos/logo2.png';

const Sidebar = () => {

  const newPage = useHookstate(page);
  const navPull = useHookstate(nav);

  return (
    <div id="sidebar" class={navPull.get() == true ? "sidebar sidebar-open" : "sidebar"}>
      <img src={logo} alt="" />
      <ul>
        <Link onClick={() => navPull.set(false)} to="/dashboard">
          <li className={newPage.get() == "dashboard" && "active-link"}>Dashboard</li>
        </Link>
        <Link onClick={() => navPull.set(false)} to="/dashboard/task">
          <li className={newPage.get() == "task" && "active-link"}>Task</li>
        </Link>
        <Link onClick={() => navPull.set(false)} to="/dashboard/accounts">
          <li className={newPage.get() == "accounts" && "active-link"}>Accounts</li>
        </Link>
        <Link onClick={() => navPull.set(false)} to="/dashboard/settings">
          <li className={newPage.get() == "settings" && "active-link"}>Settings</li>
        </Link>
      </ul>
    </div>
  )
}

export default Sidebar
