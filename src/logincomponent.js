import React, { Component } from 'react'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// export default class Login extends Component {
export default function Login({ setflag }) {
  // render() {

  const navigate = useNavigate();
  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');

  const handleSubmit = Event => {
    console.log('username', username);
    // console.log('password', password);
    // updateUsername('');
    // updatePassword('');
  }

  useEffect(() => {
    // console.log("Hello");
  }, []);

  return (<>
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
              <div className="container">
                {/* <Link className="navbar-brand" to={'/sign-in'}> */}
                <span style={{ color: "black" }}>GREDDIT</span>
                {/* </Link> */}
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <button className="nav-link"
                        onClick={() => { setflag(0) }}
                      >
                        Login
                      </button >
                    </li>
                    <li className="nav-item">
                      <button className="nav-link"
                        onClick={() => { setflag(1) }}
                      >
                        Sign up
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
          </nav>
        
      {/* </div> */}
      <form onSubmit={(e) => {
        handleSubmit();
        e.preventDefault();
        // console.log(username, password);
        
        fetch("http://localhost:3001/login", {
          method: "POST",
          crossDomain: "True",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            username,
            password
          })
        }).then((res) => {
          res.json().then((data) => {
            console.log(data);
            if(data.message==="Logged In")
            {
              // console.log(data.user)

              localStorage.setItem('Uname',data.user.username)
              navigate("/profile")
            }
            else{
              navigate("/")
            }
          });
        })
        // .catch(window.location.reload()); 
        // .catch(console.log('galat'))
        // const data = res.json();
        // console.log(res.message)
        // console.log(data);
        // if (data === "Verified") {
          // navigate("/profile");
        // }
      }}
      >

        <h3>
          Login
        </h3>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            onChange={event => updateUsername(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={event => updatePassword(event.target.value)}
          />
        </div>
        {/* <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div> */}
        <div className="d-grid">
          {/* <form action="/profile" method="POST">
          <input type="submit" />
        </form> */}


          <button type="submit" className="btn btn-primary" disabled={!password || !username}>
            Submit
          </button>


        </div>
        {/* <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p> */}
      </form>
    </div>
  </div>
        </div >
      </div >
  </>
  )
  // }
}