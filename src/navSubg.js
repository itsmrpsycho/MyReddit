import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

function NavSubg(props) {
    const path='/'+props.SubG + '/joiningrequests'
    // console.log(path);
    // const[flag,setflag]=useState(0); //make pages for all of them then add their tags
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <ul>
                <li><span style={{ color: "black" }}>GREDDIT</span></li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to={path}>Joining Requests</Link>
                </li>
                <li>
                    <Link to="/reportedusers">Reported Posts</Link>
                </li>
                <li>
                    <Link to="/stats">Stats</Link>
                </li>
                <li>
                    <Link to="/posts">Posts</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavSubg;
