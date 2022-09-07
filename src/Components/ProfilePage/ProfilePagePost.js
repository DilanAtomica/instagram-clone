import React from 'react';
import "./ProfilePagePost.css";

function ProfilePagePost({image, text, timestamp}) {
    return (
        <img src={image}  alt={text}/>
    );
}

export default ProfilePagePost;