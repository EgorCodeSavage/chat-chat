
import { onSnapshot, doc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import Message from "../Message/Message";
import "./style.css"

const MainChat = () => {

    const [messages, setMessages] = useState([]);
    const {data} = useContext(ChatContext);
    
    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        })
        return() => {
            unSub()
        }
    }, [data.chatId])

    return ( 
        <div className="main_chat">
            <div className="main_chat_inner">
                <div className="main_chat_messeges">
                    {messages.map((m)=> <Message message={m} key={m.id}/>)}
                </div>
            </div>
        </div>
     );
}
 
export default MainChat;