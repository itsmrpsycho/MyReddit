import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import OpenFormButton from './mysubgreddit';
import Subgreddit from './subgreddit.js'
function NavBar() {
  // const[flag,setflag]=useState(0); //make pages for all of them then add their tags
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <ul>
        <li><span style={{color:"black"}}>GREDDIT</span></li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/mysubgreddits">My SubGreddits</Link>
        </li>
        <li>
          <Link to="/subgreddit">SubGreddits</Link>
        </li>
        <li>
            <Link to="/savedpost">Saved Posts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
