import { useState } from 'react';
// import { useCookies } from 'react-cookie';
import { Link, useHistory } from 'react-router-dom';

import Header from '../global/header/Header';
import Footer from '../global/footer/Footer';

import logo from '../../../assets/images/logos/logo1.png';

import './Signup.css';

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory()

  // const [cookie, setCookie] = useCookies();

  const submitForm = (e) => {
    e.preventDefault();

    if (name !== "" && email !== "" && password !== ""){
      let data = {'email': email,
      'password': password,
          'name': name};

      fetch("/api/signup", {
        method: "post",
        body: JSON.stringify(data),
      })
      .then((r) => r.json())
      .then((response) => {
        if (response.status_code == 200) {
          //Signin Success
          console.log(response.message);
          // setCookie("aio_is_registered", true, {
          //   maxAge: 15768000,
          //   path: "/"
          // });
          history.push("/signin");
        }
        else {
          //If credentials entered is invalid
          console.log(response.message);
          // setErrorMessage((prevState) => ({ value: response.message }));
        ;
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
              <h3>REGISTER</h3>
              <label>Full Name</label>
              <input type="text" placeholder="Full name" onChange={(e) => setName(e.target.value)} required />
              <label>Email</label>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
              <label>Password</label>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
              <button className="btn btn-success px-5">Sign Up</button>
              <span>Already Have An Account?? <Link to="/signin">Sign In</Link></span>
            </div>
            
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Signup
