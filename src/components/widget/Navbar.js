import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Logo2 } from "../../assets";

function Navbar() {
  return (
    <nav className="nav-acct grid grid-col-2">
      <div className="nav-container   ">
        <Link to="/">
          <img className=" mt-3 w-28 block" src={Logo2} alt="" />
        </Link>
      </div>
      <div className=" nav-text flex justify-between text-xl">
        <Link to="/about">About</Link>
        <Link to="/about">Support</Link>
        <Link to="/about">Contact us</Link>
        <div>English</div>
        <Link to="/login">
          <button className="w-36 h-11">Sign In</button>
        </Link>
      </div>
    </nav>
  );
}

export { Navbar };
