import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import axios from '../../axios'
import { GoogleLogout } from 'react-google-login';
import { GoogleLogin } from 'react-google-login';
function Login() {

    const signIn = ()=>{
            
    };
    const responseGoogle = (response) => {
        console.log(response);
        
        axios.post("/auth/login",{tokendId: response.tokenId}).then(res=>{
            console.log(res.data)
        })
      }

    const responseerrGoogle = (response)=>{
        console.log(response)
    }
      

    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://i.pinimg.com/originals/ac/a9/4d/aca94d8d072082682dec2a1584533dda.png" alt="whatap logo"/>
                <div className="login__text">
                    <h1>Sign In to Whtsap</h1>
                </div>
               
                <GoogleLogin
                    clientId="1080247718906-i35pll533d3drvhk0s2vpqjghs4217qt.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseerrGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>

        </div>
    )
}

export default Login
