import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';
import FormComponent from './mySubform';
import axios from 'axios';
import './mySubform.css';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import navSubg from './navSubg';

function OpenFormButton(props) {
  const [flag, setflag] = useState(false);
  const [subG, setsubG] = useState([]);
  const [load, setLoad] = useState(0);
  const[user,setUser]=useState('');
  const navigate = useNavigate();

  

  useEffect(() => {
    const user = localStorage.getItem('Uname');
    setUser(user);
    axios.post("http://localhost:3001/getmysubgreddits", {
      username: user
    }).then((res) => {
      const arr = res.data.subarray
      setsubG(arr);
      setLoad(1);
      console.log(arr);
    })
  }, []);

  const handlenavigate=(e) =>
  { 
    navigate(e.target.value)
    console.log(e.target)
  }

  return (
    (load) ? (
    <div>
      <Popup trigger={
        <>
          <Button onClick={() => { setflag(!flag) }}>
            Add Subgreddit
          </Button>
          {(flag) ? (
            <div className='form-popup'>
              <FormComponent />
            </div>
          ) : (<></>)}
        </>}></Popup>
      {/* <Popup trigger={
        <><Button>Add Subgreddit</Button></>} modal nested>
        {
          close => (
            <div className='form-popup'>
              <FormComponent />
            </div>
          )
        }
      </Popup> */}
      <div>{
        Object.values(subG).map((e) => {
          // console.log(e)
        let path='/subgreddit/'+e.Name;
        // const subGname=path;
        // console.log(path)
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
        </form>
      </div>
          )
        })
      }

      </div>
      {/* <div class="widget-post" aria-labelledby="post-header-title">
        <div class="widget-post__header">
          <h2 class="widget-post__title" id="post-header-title">
            <i class="fa fa-pencil" aria-hidden="true"></i>
            subgredditt
          </h2>
        </div>
        <form id="widget-form" class="widget-post__form" name="form" aria-label="post widget">
          <div class="widget-post__content">
            <label for="post-content" class="sr-only">hihh</label>
            <textarea name="post" id="post-content" class="widget-post__textarea scroller" placeholder="share your moments"></textarea>
          </div>
          <div class="widget-post__options is--hidden" id="stock-options">
            <label for="search" class="sr-only">Select Symbol</label>
            <input type="search" placeholder="Select Symbol" class=" widget-post___input widget-post--search search--stock" id="search"></input>

            <label for="stock-price" class="sr-only">target price</label>
            <input type="number" class="widget-post___input widget-post--price" id="stock-price" placeholder="stock price"></input>
            <label for="stop-loss" class="sr-only">Stop Loss</label>
            <input type="number" class="widget-post___input widget-post--loss" id="stop-loss" placeholder="stop loss"></input>

            <label for="date" class="sr-only">date</label>
            <input type="date" class="widget-post___input widget-post--date" id="date"></input>
          </div>
          <div class="widget-post__actions post--actions">
            <div class="post-actions__attachments">
              <button type="button" class="btn post-actions__stock attachments--btn" aria-controls="stock-options" aria-haspopup="true">
                <i class="fa fa-usd" aria-hidden="true"></i>
                stock
              </button>
              <button type="button" class="btn post-actions__upload attachments--btn">
                <label for="upload-image" class="post-actions__label">
                  <i class="fa fa-upload" aria-hidden="true"></i>
                  upload image
                </label>
              </button>
              <input type="file" id="upload-image" accept="image/*" multiple></input>
            </div>
            <div class="post-actions__widget">
              <button class="btn post-actions__publish">publish</button>
            </div>
          </div>

        </form>
      </div> */}
    </div>) : (<p>Loading</p>)
  );
}
export default OpenFormButton;
