import React, {useContext} from 'react';
import "./ProfilePagePost.css";
import {AppContext} from "../../App";

function ProfilePagePost({image, text, timestamp, postID, publisherID}) {

    const {showPostModal} = useContext(AppContext);

    const handleOnClick = () => {
        showPostModal(image, text, timestamp, postID, publisherID);
    }

    return (
        <img className="profilePagePost" onClick={handleOnClick} src={image}  alt={text}/>
    );
}

export default ProfilePagePost;