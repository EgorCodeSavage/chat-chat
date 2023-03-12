import "./style.css"
import React from "react"

import camera from "./img/camera.png"
import userr from "./img/user.png"
import dots from "./img/dots.png"
import { useContext } from "react"
import { ChatContext } from "../../context/ChatContext"


const TopBar = () => {

    const { data } = useContext(ChatContext);

    return ( 
        <div className="topbar">
            <div className="topbarr_inner">
                <div className="topbar_user_name">{data.user?.displayName}</div>
                <div className="topbar_buttons">
                    <button><img className="video_btn" src={camera} alt="camera"/></button>
                    <button><img className="user_setting_btn" src={userr} alt="camera"/></button>
                    <button><img className="more_btn" src={dots} alt="camera"/></button>
                </div>
            </div>
        </div>
     );
}
 
export default TopBar;