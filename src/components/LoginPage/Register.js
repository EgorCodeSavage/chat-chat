import { NavLink, useNavigate } from "react-router-dom";
import "./style.css"

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from "./../../firebase"
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


const Register = () => {

    const [err, setErr] = useState('')
    const navigation = useNavigate()

    const handleSubmit = async (e) => {
        

        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const file = e.target[3].files[0]

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
        
                (error) => {
                    setErr(error.message)
                    setTimeout(() => {
                        setErr('')
                    }, 5000);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(res.user, {
                        displayName, 
                        photoURL: downloadURL,

                    });
                    await setDoc(doc(db, "users", res.user.uid), {
                        uid: res.user.uid,
                        displayName,
                        email,
                        photoURL: downloadURL,
                    });

                    await setDoc(doc(db, "usersChat", res.user.uid), {});
                    navigation("/")
                    });
                }
            );
        
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
                    <p>Register</p>
                    <form className="form_login" onSubmit={handleSubmit}>
                        <input className="displayName" type="text" placeholder="NickName" />
                        <input className="email" type="email" placeholder="email"></input>
                        <input className="password" type="password" placeholder="password"></input>
                        <input className="avatar_add" style={{display: "none"}} type="file" id="file" />
                        <label htmlFor="file" className="lable_file">
                            <img className="add_img_button" src="https://cdn-icons-png.flaticon.com/128/4131/4131729.png" alt=""></img>
                            <span>Add an avatar</span>
                        </label>
                        <button>Sing Up</button>
                    </form>
                    <div className="register">
                        <p>You dont have an account?</p>
                        <NavLink to='/login'>
                            <p className="link_relog">Sing In</p>
                        </NavLink>
                        <div className="login_alert">{err}</div>
                        <img className="gmail" src="https://www.getmailbird.com/setup/assets/imgs/logos/gmail.com.webp" alt="googleauth"/>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Register;