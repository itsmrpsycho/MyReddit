import React, { useEffect } from "react";
import { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./mySubform.css"
function FormComponent(props) {
    const [userData, setUserdata] = useState('');
    const [name, updatename] = useState('');
    const [description, updateDescription] = useState('');
    const [tags, setTags] = useState('');
    const [bannedKeywords, setbannedKeywords] = useState('');
    const[follower,setFollower]=useState('');
    const handleSubmit = Event => {
        console.log('username', name);
    }
    useEffect(() => {
        const user = localStorage.getItem('Uname');
        // console.log(user);
        setUserdata(user);
        setFollower(user);
    }, []);
    return (
        <div className="form-popup">
            <form
                onSubmit={(e) => {
                    handleSubmit();
                    e.preventDefault();
                    console.log(name);

                    fetch("http://localhost:3001/subGredditentry", {
                        method: "POST",
                        crossDomain: "True",
                        headers: {
                            "Content-Type": "application/json",
                            accept: "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({
                            userData,
                            name,
                            description,
                            tags,
                            bannedKeywords,
                            follower,
                        })
                    }).then((res) => {
                        res.json().then((data) => {
                            console.log(data);
                            // localStorage.setItem('Uname', JSON.stringify(data.user))
                        });
                    })
                }}
            >
                <div className="btn-Display">
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    onChange={event => updatename(event.target.value)}
                />
                <label>Description</label>
                <input
                    type="text"
                    placeholder="Enter Description"
                    onChange={event => updateDescription(event.target.value)}
                />
                <label>Tag</label>
                <input
                    type="text"
                    placeholder="Enter Tags"
                    onChange={event => setTags(event.target.value.split(","))}
                />
                <label>Banned Keywords</label>
                <input
                    type="text"
                    placeholder="Enter Banned Keywords"
                    onChange={event => setbannedKeywords(event.target.value.split(","))}
                />
                <button type="submit" disabled={!name || !description}>
                    Submit
                </button>
                </div>
            </form>
        </div >
    );
}
export default FormComponent;
