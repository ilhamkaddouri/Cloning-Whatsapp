import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
function Login() {

    const signIn = ()=>{
            
    };

    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://i.pinimg.com/originals/ac/a9/4d/aca94d8d072082682dec2a1584533dda.png" alt="whatap logo"/>
                <div className="login__text">
                    <h1>Sign In to Whtsap</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In with google
                </Button>
            </div>

        </div>
    )
}

export default Login
