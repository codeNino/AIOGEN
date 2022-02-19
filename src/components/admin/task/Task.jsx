import { useHookstate } from '@hookstate/core';
import { page, nav } from '../../../services/store';

import Sidebar from '../global/sidebar/Sidebar';
import './Task.css';

const Task = () => {

  const newPage = useHookstate(page);
  const navPull = useHookstate(nav);
  newPage.set("task");
  // navPull.set(false);

  return (
    <div id="task">
      <Sidebar />
      <div className="task-div">
        <button className="menu-btn" onClick={() => navPull.set(!navPull.get())}>
          <i className={navPull.get() == false ? "ri-menu-line" : "ri-close-line"}></i>
        </button>
        <div className="container">
          <div className="task-title">
            <h5>New Task</h5>
          </div>
          <form action="#" className="fields">
            <label>Select Account</label>
            <input type="text" />
            <label>Recovery Email</label>
            <input type="email" />
            <label>Number of accounts</label>
            <input type="range" />
            <div className="btn-div">
              <button className="btn btn-success px-5 mt-3">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Task
