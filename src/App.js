import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Login from './logincomponent.js'
import SignUp from './signupcomponent.js'
import Profile from './Profile.js'
import NavBar from './navbar.js'
import OpenFormButton from './mysubgreddit';
import Subgreddit from './subgreddit.js'
import SubgredditPage from './subGredditpage.js'
import SavePost from './savedpost'
import Joinrequests from './joinrequest.js'
// import './user_profie.css'

function App() {
  const[flag,setflag]=useState(0);
  // console.log(flag)
  return (
    <Router>
      
            <Routes>
              <Route path="/" element={(flag===0) ? (<Login setflag={setflag}/>):(<SignUp setflag={setflag}/>)} />
              {/* <Route path="/sign-in" element={<Login />} /> */}
              {/* <Route path="/sign-up" element={<SignUp />} /> */}
              <Route path="/profile" element={< Profile />} />
              <Route path='/mysubgreddits' element ={<OpenFormButton/>}/>
              <Route path ='/subgreddit' element ={<Subgreddit/>}/>
              <Route path='/subgreddit/:subGname' element ={<SubgredditPage/>}/>
              <Route path='/savedpost' element = {<SavePost/>}/>
              <Route path='/:subGname/joiningrequests' element = {<Joinrequests/>}/>
            </Routes>
    
          
    </Router>
  )
}
 //subGname is a nalogus to my e.Name
// function Appp() {
//   return (
//     <Router>
//       <div>
//         <Navbar />
//         <Profile />
//         <Switch>
//           <Route exact path="/" component={Home} />
//           <Route path="/about" component={About} />
//           <Route path="/contact" component={Contact} />
//         </Switch>
//       </div>
//     </Router>
//   );
// }

export default App