import React from 'react';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavSubg from './navSubg';
function Subgreddit(){
    const[subG,setsubG]=useState([]);
    const[user,setUser]=useState('');

    const navigate=useNavigate();
    function follow(user1, subg) {
      // console.log(user1,user2);
      axios.post("http://localhost:3001/followsubg",
          {
              user1: user1,
              subg:subg,
          }
      ).then((res) => {
  
          console.log(res);
      })
  
  }
    useEffect(() => {
      const user = localStorage.getItem('Uname');
      setUser(user);
        axios.post("http://localhost:3001/getsubgreddits",{

        }).then((res)=>{
          const arr=res.data.subarray
          console.log(arr)
          setsubG(arr);
          console.log(arr);
        })
    }
    
    , []);
    const handlenavigate=(e) =>
    { 
      navigate(e.target.value)
      console.log(e.target)
    }
      return (
        <div>
        
        {Object.values(subG).map((e) => {
            // console.log(e)
            return (
            // <p>{e.Name}</p>
            <div class="widget-post" aria-labelledby="post-header-title">
          <div class="widget-post__header">
            <h2 class="widget-post__title" id="post-header-title">
              <i class="fa fa-pencil" aria-hidden="true"><strong><u>Name:</u></strong><br></br>{e.Name}</i><button onClick={handlenavigate} value = {"/subgreddit/"+e.Name}> Show Posts </button>
            </h2>
          </div>
          <form id="widget-form" class="widget-post__form" name="form" aria-label="post widget">
            <div class="widget-post__content">
              <label for="post-content" class="sr-only">yup</label>
            </div>
            <div>
            <h3 class="widget-post__title" id="post-header-title">
              <i class="fa fa-pencil" aria-hidden="true"><strong><u>Description:</u></strong><br></br>{e.Description}</i>
            </h3>
            </div>
            <div>
            <h3 class="widget-post__title" id="post-header-title">
              <i class="fa fa-pencil" aria-hidden="true"><strong><u>Tags:</u></strong><br></br>{e.Tags}</i>
            </h3>
            </div>
            <div>
            <h3 class="widget-post__title" id="post-header-title">
              <i class="fa fa-pencil" aria-hidden="true"><strong><u>Banned Keywords</u></strong><br></br>{e.bannedKeywords}</i>
            </h3>
            </div>
            <div>
            <h3 class="widget-post__title" id="post-header-title">
              <i class="fa fa-pencil" aria-hidden="true"><strong>Moderator:</strong><br></br>{e.moderator}</i>
            </h3>
            </div>
            <button type="button" onClick={() => follow(user, e.Name)}>Follow Subgreddit</button>
          </form>
        </div>
            )
          })}
          </div>
         )  
}
export default Subgreddit;
 