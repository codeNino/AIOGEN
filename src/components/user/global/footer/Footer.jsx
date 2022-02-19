import './Footer.css';
import logo from '../../../../assets/images/logos/logo2.png';

const Footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src={logo} alt="Logo" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet obcaecati placeat iure cumque minus, non nulla in eaque aliquid. Consectetur, odit eveniet quam optio id doloremque quibusdam quae praesentium adipisci?</p>
          </div>
          <div className="col-md-4">
            <h4>Company</h4>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Contact us</li>
              <li>Support</li>
              <li>Pricing</li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <div>
              <p>Address: Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab inventore numquam blanditiis labore.</p>
              <p>Phone: +123456789</p>
              <p>Tel: +123456789</p>
              <p>Email: sample@domain.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
