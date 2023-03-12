import "./style.css"

import {signOut} from "firebase/auth"
import { auth } from "../../firebase";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Search from "../Search/Search";
import Chats from "../Chats/Chats";

const Sidebar = () => {

    const {currentUser} = useContext(AuthContext)

    return ( 
        <div className="side_bar">
            <div className="side_bar_inner">
                <div className="side_bar_myuser">
                    <img className="my_avatar" src={currentUser.photoURL} alt="my_avatar"/>
                    <p className="user_name">{currentUser.displayName}</p>
                    <button onClick={() => signOut(auth)} className="logout_btn">Log Out</button>
                </div>
                <Search />
                <Chats />
            </div>
        </div>
     );
}
 
export default Sidebar;