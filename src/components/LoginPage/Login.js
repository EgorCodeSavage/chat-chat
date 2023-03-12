import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../firebase";

import "./style.css"

const Login = () => {

    const [err, setErr] = useState('')
    const navigation = useNavigate()

    const handleSubmit = async (e) => {
        
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        try {
           await signInWithEmailAndPassword(auth, email, password)
            navigation('/')
        } catch (error) {
            setErr(error.message)
            setTimeout(() => {
                setErr('')
            }, 5000);
        }
    };

  
    return ( 
        <div className="login_page">
            <div className="login_page_inner">
                <div className="login_window">
                    <h2>Chat Chat</h2>
                    <p>Login</p>
                    <form className="form_login" onSubmit={handleSubmit}>
                        <input className="email" type="email" placeholder="email"></input>
                        <input className="password" type="password" placeholder="password"></input>
                        <button>Sing In</button>
                    </form>
                    <div className="register">
                        <p>You dont have an account?</p>
                        <NavLink to='/register'>
                            <p className="link_relog">Sing Up</p>
                        </NavLink>
                        <div className="login_alert">{err}</div>
                        <img className="gmail" src="https://www.getmailbird.com/setup/assets/imgs/logos/gmail.com.webp" alt="googleauth"/>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Login;