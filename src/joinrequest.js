import React from 'react';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import NavSubg from './navSubg';
function Joinrequests() {
  const { subGname } = useParams()
  // const[subG,setsubG]=useState([]);
  const [user, setUser] = useState(" ");
  const [load, setload] = useState(false);
  const [array, setArray] = useState([]);
  const [accept, setAccept] = useState(0);
  // const navigate=useNavigate();

  // console.log(user1,user2);
  function acceptfunc(e) {
    // {console.log("Ho")}
    axios.post("http://localhost:3001/accept", {
      user: e,
      subG: subGname,
    }).then((res) => {
      const result = res.data
      console.log(result);
    })
    .catch((err)=>{console.log(err)})
  }
  function rejectfunc(e) {
    // {console.log("Hi")}
    axios.post("http://localhost:3001/reject", {
      user: e,
      subG: subGname,
    }).then((res) => {
      const result = res.data
      console.log(result);
    })
    // .catch((err)=>{console.log(err)})
  }

  useEffect(() => {
    const uname=localStorage.getItem('Uname')
    setUser(uname);
    axios.post("http://localhost:3001/displaysubjoin",
      {
        subG: subGname,
      }
    ).then((res) => {
      setArray(res.data);
      setload(true);
      // console.log(res);
    })
  }, []);


  return (
    <div>
      <p>Hi</p>
      {/* {followlist()}; */}
      {(load) ? (<>
        {console.log(array)}
        {array.Joinrequests.map((e, i) => {
          // console.log(e)
          return (
            // <p>{e.Name}</p>
            <div class="widget-post" aria-labelledby="post-header-title">
              <form id="widget-form" class="widget-post__form" name="form" aria-label="post widget" key={i}>
                <div class="widget-post__content">
                  <label for="post-content" class="sr-only">yup</label>
                </div>
                <div>
                  <h3 class="widget-post__title" id="post-header-title">
                    <i class="fa fa-pencil" aria-hidden="true"><strong><u>Follow Requests:</u></strong><br></br>{e}</i>
                    <button type="button" onClick={() => { acceptfunc(e) }}>Accept</button>
                    <button type="button" onClick={() => { rejectfunc(e) }}>Reject</button>
                  </h3>
                </div>
              </form>
            </div>
          )
        })}</>) : (<p>Loading</p>)}
    </div>
  )
}
export default Joinrequests;
