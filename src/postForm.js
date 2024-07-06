import React, { useEffect } from "react";
import { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import "./mySubform.css"
function FormPart(props) {
    const subGname = props.subGname;
    const [name, updatename] = useState('');
    const [description, updateDescription] = useState('');
    // const [comments, setComments] = useState('');
    const[userData,setUserdata]=useState('');
    const handleSubmit = Event => {
        console.log('username', name);
    }
    useEffect(() => {
        const user = localStorage.getItem('Uname');
        // console.log(user);
        setUserdata(user);
    }, []);
    return (
        <div className="form-popup">
            <form
                onSubmit={(e) => {
                    handleSubmit();
                    e.preventDefault();
                    console.log(name);

                    fetch("http://localhost:3001/postentry", {
                        method: "POST",
                        crossDomain: "True",
                        headers: {
                            "Content-Type": "application/json",
                            accept: "application/json",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify({
                            userData,
                            // name,
                            
                            description,
                            subGname,
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
                {/* <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    onChange={event => updatename(event.target.value)}
                /> */}
                <label>Description</label>
                <input
                    type="text"
                    placeholder="Enter Description"
                    onChange={event => updateDescription(event.target.value)}
                />
                {/* <label>Comments</label>
                <input
                    type="text"
                    placeholder="Enter Comments"
                    onChange={event => setComments(event.target.value)}
                /> */}
                <button type="submit" disabled={ !description}>
                    Submit
                </button>
                </div>
            </form>
        </div >
    );
}
export default FormPart;
