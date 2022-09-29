import React, {useContext} from 'react';
import "./ProfilePagePost.css";
import {AppContext} from "../../App";

function ProfilePagePost({image, text, timestamp, postID, publisherID}) {

    const {showPostModal, activateLoader} = useContext(AppContext);

    const handleOnClick = () => {
        activateLoader();
        showPostModal(image, text, timestamp, postID, publisherID);
    }

    return (
        <li><img className="profilePagePost" onClick={handleOnClick} src={image}  alt={text}/></li>
    );
}

export default ProfilePagePost;