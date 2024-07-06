import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';
import CommentForm from './commentForm';
import axios from 'axios';
const SavePost=()=> {
    const [upVote, setupvote] = useState(0);
    const [downVote, setdownvote] = useState(0);
    const [user, setUser] = useState(0);
    const [flag, setflag] = useState(0);
    const [flag1, setflag1] = useState(0);
    const [savedPosts, setSavedPosts] = useState([]);
    const [done, setdone] = useState(false);
    useEffect(() => {
        setUser(localStorage.getItem('Uname'));
        axios.post("http://localhost:3001/displaysavedpost", {
            username: localStorage.getItem('Uname')
        }).then((res) => {
            
            setdone(true)
            setSavedPosts(res.data);
        })
    }, []);
    function handleupvote(postId, Username) {
        // console.log('upvotingg');
        console.log(postId);
        axios.post("http://localhost:3001/upvote",
            {
                postId: postId,
                Username: Username,
            }
        ).then((res) => {

            
            setupvote(res);
            // console.log(res);
        })

    }
    function handledownvote(postId, Username) {
        // console.log('donvotinggg');
        axios.post("http://localhost:3001/downvote",
            {
                postId: postId,
                Username: Username,
            }
        ).then((res) => {
            setdownvote(res);
            // console.log(res);
        })

    }
    function follow(user1, user2) {
        // console.log(user1,user2);
        axios.post("http://localhost:3001/follow",
            {
                user1: user1,
                user2: user2,
            }
        ).then((res) => {

            console.log(res);
        })

    }
    return (
        done?
        savedPosts.map((f) => {
            console.log("hinfejnfhjbe");
            console.log(f);
            return (
                <div class="widget-post" aria-labelledby="post-header-title">
                    <form id="widget-form" class="widget-post__form" name="form" aria-label="post widget">
                        <div class="widget-post__content">
                            <label for="post-content" class="sr-only">yup</label>
                        </div>
                        <div>
                            <h3 class="widget-post__title" id="post-header-title">
                                <i class="fa fa-pencil" aria-hidden="true"><strong><u>Description:</u></strong><br></br>{f.Description}</i>
                            </h3>
                        </div>
                        <div>
                            <h3 class="widget-post__title" id="post-header-title">
                                <i class="fa fa-pencil" aria-hidden="true"><strong><u>Posted By</u></strong><br></br>{f.Author}</i>
                            </h3>
                        </div>
                        {console.log(f._id)}
                        <button type="button" onClick={() => { handleupvote(f._id, user) }}>Upvote</button><strong>{f.Upvote.length}</strong>
                        <button type="button" onClick={() => { handledownvote(f._id, user) }} >Downvote</button><strong>{f.Downvote.length}</strong>
                        {/* <button type="button" onClick={() => {handlesavepost(f._id,user)}}>Save Post</button> */}
                        <button type="button" onClick={() => follow(user, f.Author)}>Follow</button>
                        <Popup trigger={
                            <>
                                <Button onClick={() => { setflag1(!flag1) }}>
                                    Comment
                                </Button>
                                {(flag1) ? (
                                    <div className='form-popup'>
                                        {/* <h2>fsgerwsr</h2> */}
                                        {/* <h2>{post._id}</h2> */}
                                        <CommentForm post={f._id} />
                                    </div>
                                ) : (<></>)}
                            </>}></Popup>
                        {/* <br></br> */}
                    </form>
                </div>
            )
        })
    :(<></>));
}
export default SavePost;