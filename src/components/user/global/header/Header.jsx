import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logos/logo.png';

const Header = () => {
  return (
    <div id='header'>
      <nav class="navbar navbar-expand-lg navbar-light bg-white py-4 shadow-sm">
        <div class="container">
          <Link to="/">
            <img src={logo} alt="AIO" width="55" />
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item mx-2">
                <a class="nav-link active" aria-current="page" href="#">About</a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link" href="#">Support</a>
              </li>
              <li class="nav-item mx-2">
                <a class="nav-link" href="#">Contact Us</a>
              </li>
              <li class="nav-item dropdown mx-2">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  English
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">French</a></li>
                  <li><a class="dropdown-item" href="#">Spanish</a></li>
                  <li><a class="dropdown-item" href="#">Arabic</a></li>
                </ul>
              </li>
              <Link to="/signin">
                <button class="btn btn-success navbar-btn px-4">Sign in</button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
