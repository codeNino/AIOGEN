import Header from '../global/header/Header';
import Footer from '../global/footer/Footer';
import './Home.css';
import logo from '../../../assets/images/logos/logo1.png';
import accounts from '../../../assets/images/others/accounts.png';
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <div id="home">
      <Header/>
      <div className="main">
        <img src={logo} alt="Logo" width="200" />
        <h1>ALL IN ONE GENERATOR</h1>
        <h5>EASILY LOG INTO MULTIPLE ACCOUNTS</h5>
        <Link to="/signup">
          <button className="btn btn-success me-2">SIGN UP</button>
        </Link>
        <Link to="/signin">
          <button className="btn btn-outline-success">SIGN IN</button>
        </Link>
      </div>
      <div className="container first-row">
        <div className="row">
          <div className="col-md-6 left-col">
            <h5>Create multiple accounts very easily with one click</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam modi vitae corrupti voluptate quae laborum cupiditate, asperiores veritatis, earum fugiat omnis suscipit consequuntur! Aspernatur expedita laborum temporibus repellat, nemo at?</p>
          </div>
          <div className="col-md-6">
            <img src={accounts} alt="Image" />
          </div>
        </div>
      </div>
      <div className="points">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <i class="ri-service-line"></i>
              <h5>Easy to Use</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos porro commodi nobis qui ducimus facilis voluptatum quia placeat et.</p>
            </div>
            <div className="col-md-4">
              <i class="ri-time-line"></i>
              <h5>Save Time</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos porro commodi nobis qui ducimus facilis voluptatum quia placeat et.</p>
            </div>
            <div className="col-md-4">
              <i class="ri-thumb-up-line"></i>
              <h5>Reliable</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos porro commodi nobis qui ducimus facilis voluptatum quia placeat et.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="plans">
        <div className="container">
          <div className="head">
            <h4>Our Custom Plans</h4>
            <p>We have taken time to create plans that have been tailor made just for you</p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="sub-card">
                <h3>Free</h3>
                <div className="price">$0</div>
                <p>Google Ads</p>
                <p>Social Media</p>
                <p>Email Marketing</p>
                <p>24/7 Customer Care Service</p>
                <button className="btn btn-success px-4 pt-2 pb-2 mt-3">SUBSCRIBE</button>
              </div>
            </div>
            <div className="col-md-4 standard">
              <div className="sub-card">
                <h3>Standard</h3>
                <div className="price">$100/Month</div>
                <p>Google Ads</p>
                <p>Social Media</p>
                <p>Email Marketing</p>
                <p>24/7 Customer Care Service</p>
                <button className="btn btn-success px-4 pt-2 pb-2 mt-3">SUBSCRIBE</button>
              </div>
            </div>
            <div className="col-md-4">
              <div className="sub-card">
                <h3>Premium</h3>
                <div className="price">$200/Month</div>
                <p>Google Ads</p>
                <p>Social Media</p>
                <p>Email Marketing</p>
                <p>24/7 Customer Care Service</p>
                <button className="btn btn-success px-4 pt-2 pb-2 mt-3">SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact">
        <h3>Contact Us</h3>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, aliquid molestiae accusantium adipisci soluta, esse distinctio sunt odit modi quis architecto itaque quo, deserunt explicabo necessitatibus cumque cum doloribus? Dicta.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, aliquid molestiae accusantium adipisci soluta</p>
            </div>
            <div className="col-md-6">
              <form action="#">
                <div className="input-pair">
                  <input type="text" placeholder="First name" />
                  <input type="text" placeholder="Last name" />
                </div>
                <div className="input-pair">
                  <input type="text" placeholder="Email" />
                  <input type="text" placeholder="Phone number" />
                </div>
                <input type="text" placeholder="Subject" />
                <textarea placeholder="Message"></textarea>
                <button className="btn btn-light px-5">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
