import React, {useContext} from 'react';
import "./ProfilePagePost.css";
import {AppContext} from "../../App";

function ProfilePagePost({image, text, timestamp, postID}) {

    const {showPostModal} = useContext(AppContext);

    const handleOnClick = () => {
        showPostModal(image, text, timestamp, postID);
    }

    return (
        <img onClick={handleOnClick} src={image}  alt={text}/>
    );
}

export default ProfilePagePost;