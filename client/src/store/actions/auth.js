import M from "materialize-css";
import { useHistory } from "react-router-dom"

export const Login = () => {
    const history = useHistory()
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


export const Register = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
        return
    }
    fetch("/api/auth/register",{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
        }else{
            M.toast({html:data.message,classes:"#43a047 green darken-1"})
        }
    })
    .then(err => {
        console.log(err);
    })
}