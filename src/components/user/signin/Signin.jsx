import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../global/header/Header';
import Footer from '../global/footer/Footer';

import logo from '../../../assets/images/logos/logo1.png';

import './Signin.css';

export default function Signin({ setToken }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let history = useHistory();

  const submitForm = (e) => {
    e.preventDefault();

    if (email !== "" && password !== ""){
      let data = {'email': email,
                  'password': password};

      console.log(data)

      fetch("/api/login", {
        method: "post",
        body: JSON.stringify(data),
      })
      .then((r) => r.json())
      .then((response) => {
        if (response.status_code == 200) {
          //Signin Success
          console.log(response.status_code);
          const token = {"token": data.email};
          setToken(token);
          history.push("/dashboard");
        }
        else {
          //If credentials entered is invalid
          console.log(response.message);
          // setErrorMessage((prevState) => ({ value: response.message }));
        }
      });
    }
  }

  return (
    <div id="signin">
      <Header />
      <div className="container">
        <form className="form" onSubmit={submitForm}>
          <div className="left-div">
            <div>
              <img src={logo} alt="" />
              <h3>ALL IN ONE GENERATOR</h3>
              <p>EASILY LOG INTO MULTIPLE ACCOUNTS</p>
            </div>
          </div>
          <div className="right-div">
            <div>
              <h3>LOGIN</h3>
              <label>Email</label>
              <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              <label>Password</label>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              <span><Link to= "/">Forgot Password?</Link></span>
              <button className="btn btn-success px-5">Sign In</button>
              <span>Don't Have An Account? <Link to="/signup">Sign Up</Link></span>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

Signin.propTypes = {
  setToken: PropTypes.func.isRequired
};
