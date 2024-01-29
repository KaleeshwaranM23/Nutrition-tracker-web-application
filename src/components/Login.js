import React from "react";
import { useState, useContext } from "react";
import { userContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

function Login()
{

    const loggedData = useContext(userContext)

    const navigate = useNavigate();

    const [userCreds, setUserCreds] = useState({
        email:"",
        password:""
    })

    const [message, setMessage] = useState({
        type:"invisible-msg",
        text:"message"
    })

    function handleInput(event){
        setUserCreds((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value};
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(userCreds);

        fetch("http://localhost:8000/login",{
            method:"POST",
            body:JSON.stringify(userCreds),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{

            if(response.status===404)
            {
                setMessage({type:"error",text:"Please check your email and try again!"})
            }
            else if(response.status===403)
            {
                setMessage({type:"error",text:"Incorrect Password!"})
            }
        

            setTimeout(()=>{
                setMessage({type:"invisible-msg", text:"message"});
            },5000)

            return response.json()

        })

        .then((data)=>{

            
            
            if(data.token!==undefined)
            {

                localStorage.setItem("nutrition-tracker-app",JSON.stringify(data))

                loggedData.setLoggedUser(data);

                navigate("/track");

            }
            
        })

        .catch((err)=>{
            console.log(err);
        })    
    }

    return (

        <>

        

        <section className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login To Track Your Nutrition</h1>
                
                <input className="inp" type="email" onChange={handleInput}  placeholder="Email" name="email" required value={userCreds.email}/>
                <input className="inp" type="password" onChange={handleInput}  placeholder="Password" name="password" minLength={8}  required value={userCreds.password}/>
               
                <button className="btn">Login</button>
                <p>Don&#39;t have an Account? <Link to="/register">Register</Link></p>

                <p className={message.type}>{message.text}</p>
            </form>
        </section>
        </>
    )
}

export default Login;