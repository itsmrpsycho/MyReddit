import React from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LaunchIcon from '@mui/icons-material/Launch';
import FormPart from "./postForm.js"
import CommentForm from "./commentForm.js"
import NavSubg from './navSubg.js';
import Navuser from './Navuser.js';
function SubgredditPage() {
    const { subGname } = useParams();
    const [subG, setsubG] = useState([]);
    const [post, setPost] = useState([]);
    const [load, setLoad] = useState(0);
    const [load1, setload1] = useState(0);
    const [flag, setflag] = useState(0);
    const [flag1, setflag1] = useState(0);
    const [comment, setComment] = useState([]);
    const [commentArray, setcommentArray] = useState([0]);
    const [user, setUser] = useState(" ");
    const [upVote, setupvote] = useState(0);
    const [downVote, setdownvote] = useState(0);
    const [message, setMessage] = useState(0);
    // const[savepost,setSavepost]=useState(0);


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


    useEffect(() => {
        setUser(localStorage.getItem('Uname'));
        axios.post("http://localhost:3001/displaysub", {
            subG: subGname
        }).then((res) => {
            const arr = res.data.subarray
            setsubG(arr);
            setLoad(1);
            // console.log(arr);
        })
    }, []);
    useEffect(() => {
        axios.post("http://localhost:3001/displayposts", {
            post: subGname
        }).then((res) => {
            const arr1 = res.data.subarray
            // setComment(arr1);
            setload1(1);
            setPost(arr1);
            setupvote(post.Upvote)
            setdownvote(post.Downvote)
            // setLoad(1);
            // console.log(res.data)
        })
    }, []);
    useEffect(() => {
        const user = localStorage.getItem('Uname');
        setUser(user);
        // console.log(user);
        axios.post("http://localhost:3001/checkmodsubg", {
            username: user,
            subG: subGname,
        }).then((res) => {
            console.log(res.data.message);
            setMessage(res.data.message);
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
    function handlesavepost(postId, Username) {
        // console.log('Saving....');
        // console.log(postId);
        axios.post("http://localhost:3001/savepost",
            {
                postId: postId,
                Username: Username,
            }
        ).then((res) => {
            // setupvote(res);
            console.log(res);
        })

    }

    return (
        (load && load1  ) ? (
            <>
                {Boolean(message)  && <NavSubg  SubG={subGname}/>}
                {Boolean(message)===false && <Navuser SubG={subGname}/>}
                <div>
                    <Popup trigger={
                        <>
                            <Button onClick={() => { setflag(!flag) }}>
                                Create Post
                            </Button>
                            {(flag) ? (
                                <div className='form-popup'>
                                    <FormPart subGname={subGname} />
                                </div>
                            ) : (<></>)}
                        </>}></Popup>
                    <div>
                        {subG.map((e) => {
                            return (
                                <div class="widget-post" aria-labelledby="post-header-title">
                                    <div class="widget-post__header">
                                        <h2 class="widget-post__title" id="post-header-title">
                                            <i class="fa fa-pencil" aria-hidden="true"><strong><u>Name:</u></strong><br></br>{e.Name}</i>
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
                            );
                        })}
                        {post.map((f) => {
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
                                        {/* {console.log(f._id)} */}
                                        <button type="button" onClick={() => { handleupvote(f._id, user) }}>Upvote</button><strong>{f.Upvote.length}</strong>
                                        <button type="button" onClick={() => { handledownvote(f._id, user) }} >Downvote</button><strong>{f.Downvote.length}</strong>
                                        <button type="button" onClick={() => { handlesavepost(f._id, user) }}>Save Post</button>
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
                            );
                        })}
                    </div>
                </div ></>) : (<p>Loading</p>)
    );

}
export default SubgredditPage;
