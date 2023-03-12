import { useContext, useState } from "react";
import "./style.css"

import { collection, query, where, setDoc, doc, updateDoc, serverTimestamp, getDoc, getDocs } from "firebase/firestore";
import {db} from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";


const Search = () => {

    const [username, setUsername] = useState('');
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext)


    const handleSearch = async () => {
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setUser(doc.data());
            });
        } catch (err) {
            setErr(true)
        }    
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async (u) => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                //create chat in chats collections
                await setDoc(doc (db, "chats" , combinedId), {messages: []})

                //create user chats
                await updateDoc(doc(db, "usersChat", currentUser.uid), {
                    [combinedId+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "usersChat", user.uid), {
                    [combinedId+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId+".date"]: serverTimestamp()
                });
            }
        } catch (error) {}

        //create user chats
        setUser(null);
        setUsername('');

        dispatch({type: "CHANGE_USER", payload: u})
    }

    return ( 
        <div className="search">
            <div className="search_form">
                <input value={username} onKeyDown={handleKey} onChange={(e) => setUsername(e.target.value)} className="find_user" type="text" placeholder="Find a user"/>
            </div>
            {err && <div className="err">Can't find a user</div>}
            <div className="side_bar_users">
                {user && 
                    <div className="side_bar_user" onClick={()=>handleSelect(user)}>
                        <img className="user_avatar" src={user.photoURL} alt="avatar"/>
                        <div className="user_text">
                            <p className="user_name">{user.displayName}</p>
                            <p className="user_last_messege">this is my cat</p>
                        </div>
                    </div>
                }
            </div>
        </div>
     );
}
 
export default Search;