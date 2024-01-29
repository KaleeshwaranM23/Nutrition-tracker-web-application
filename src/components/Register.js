import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register()
{

    const [userDetails, setUserDetails] = useState({
        name:"",
        email:"",
        password:"",
        age:""
    })

    const [message, setMessage] = useState({
        type:"invisible-msg",
        text:"message"
    })

    function handleInput(event){
        setUserDetails((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value}
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        // console.log(userDetails);

        fetch("http://localhost:8000/register",{
            method:"POST",
            body:JSON.stringify(userDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            
            setMessage({type:"success",text:data.message});

            setUserDetails({
                name:"",
                email:"",
                password:"",
                age:""
            })

            setTimeout(()=>{
                setMessage({type:"invisible-msg", text:"message"});
            },5000)

        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <section className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Start your Nutrition Tracking</h1>
                <input className="inp" type="text" onChange={handleInput} placeholder="Enter Your Name" name="name" value={userDetails.name} required/>
                <input className="inp" type="email" onChange={handleInput} placeholder="Enter Your Email" name="email" value={userDetails.email} required/>
                <input className="inp" type="password" onChange={handleInput} placeholder="Enter Your Password" name="password" value={userDetails.password} required minLength={8} maxLength={16}/>
                <input className="inp" type="number" onChange={handleInput} placeholder="Enter Your age" name="age" value={userDetails.age} required  min={12} max={100}/>
                <button className="btn">Join</button>
                <p>Already Registered? <Link to="/login">Login</Link></p>

                <p className={message.type}>{message.text}</p>

            </form>
        </section>
    )
}

export default Register;