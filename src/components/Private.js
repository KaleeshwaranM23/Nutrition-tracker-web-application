import React from "react";
import { Navigate } from "react-router-dom";
import userContext from "../contexts/UserContext";
import { useContext } from "react";


function Private(props)
{
    const loggedData = useContext(userContext)

    return (

        loggedData.loggedUser !== null?
        <props.Component/>:<Navigate to="/login"/>

    )

}

export default Private;