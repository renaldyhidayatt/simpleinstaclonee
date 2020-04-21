import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css"


const Signin = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const history = useHistory()
    const Login = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/api/auth/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            if(data.error){
                M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }else{
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                M.toast({html:"signedin success", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        })
    }

    return(
        <div className="login-page">
            <div className="card form">
                <h2 className="mytitle">Instagram</h2>
                    <input 
                        type="email" 
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={()=>Login()}>login</button>
                    <p className="message">Dont have<Link to="/signup"> Account ?</Link></p>
            </div>
        </div>
    )   
}

export default Signin;