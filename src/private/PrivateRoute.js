import React, { useEffect } from "react";

import SignIn from "../pages/SignIn";
import UserAgreement from "../pages/useragreement";
import SetPassword from "../pages/Setpass";

function checkRoute (){
    if(window.location.pathname.includes("/user-agreement")){
        return <UserAgreement/>
    }else if(window.location.pathname.includes("/register")){
        return <SetPassword/>
    }else{
        return <SignIn/>
    }
    // return window.location.pathname.includes('/user-agreement')? <UserAgreement/>:<SignIn/> || window.location.pathname.includes('/register')? <SetPassword/>:<SignIn/>
}

const PrivateRoute =({children})=>{
    const [token,setToken] = React.useState(null);

    useEffect(()=>{
        const tokens = localStorage.getItem('token');
        if(tokens){
            setToken(tokens);
        }
    },[token]);
    ;
    return token ? children : checkRoute()
}

export default PrivateRoute;