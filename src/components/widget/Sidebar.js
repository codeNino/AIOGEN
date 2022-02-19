import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { Clipboard, Settings, User } from "../../assets";

function Sidebar() {

  const handleLogout = () => {
    localStorage.clear();
    window.location.pathnamme = "/login";
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeMenu = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <nav className="sidenav container relative">
        <button onClick={handleToggle}>
          {sidebarOpen ? (
            <MdClose className="w-10 h-5 text-white" />
          ) : (
            <GiHamburgerMenu className="w-10 h-5 text-white" />
          )}
        </button>
        <div className={`menuNav ${sidebarOpen ? " showMenu" : ""}`}>
          <div className="pt-20 text-center sm:text-center space-y-10">
            <NavLink
              to="/dashboard/accounts"
              activeClassName="no-underline text-white active-link"
              onClick={() => closeMenu()}
              exact
            >
              Accounts
            </NavLink>

            <NavLink
              to="/dashboard/tasks"
              activeClassName="no-underline text-white active-link"
              onClick={() => closeMenu()}
              exact
            >
              Task
            </NavLink>

            <NavLink
              to="/dashboard/settings"
              className="no-underline text-white"
              activeClassName="text-white active-link"
              onClick={() => closeMenu()}
              exact
            >
              Settings
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export { Sidebar };