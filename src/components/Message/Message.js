import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import "./style.css"

const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])
    return ( 
        <div ref={ref} className={`message_${message.senderId === currentUser.uid ? "owner" : "user"}`}>
            <div className="message_info">
                <img className="main_chat_userimg" src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" />  
                <span className="main_chat_time"></span>  
            </div>
            <div className="message_content">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>    
        </div>
     );
}
 
export default Message;