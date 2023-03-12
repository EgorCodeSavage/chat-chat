import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db, storage } from "../../firebase";
import { v4 as uuid} from "uuid"

import "./style.css"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputBlock = () => {

    const [text, setText] = useState('');
    const [Img, setImg] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const {data} = useContext(ChatContext);

    const handleSend = async () => {
        if(Img) {
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, Img);

            uploadTask.on(
        
                (error) => {
                    // console.log(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date:Timestamp.now(),
                                img:downloadURL,
                            }),
                        });
                    });
                }
            );
        
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date:Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "usersChat", currentUser.uid), {
            [data.chatId+".lastMessage"] : {
                text
            },
            [data.chatId+'.data'] : serverTimestamp()
        })
        await updateDoc(doc(db, "usersChat", data.user.uid), {
            [data.chatId+".lastMessage"] : {
                text
            },
            [data.chatId+'.data'] : serverTimestamp()
        })

        setText('');
        setImg(null);
    };

    return ( 
        <div className="input_block">
            <div className="input_block_inner">
                <input value={text} className="input_block_input" type="text" placeholder="Type Something..." onChange={e=> setText(e.target.value)} />
                <div className="send">
                    <input type="file" style={{display: "none"}} id="file" onChange={e=>setImg(e.target.files[0])} />
                    <label htmlFor="file">
                        <img className="add_img_button" src="https://cdn-icons-png.flaticon.com/128/4131/4131729.png" alt="" />
                    </label>
                </div>
                <button onClick={handleSend} className="sed_btn" >Send</button>
            </div>
        </div>
     );
}
 
export default InputBlock;