import React from 'react';
import "./Avatar.css";

function Avatar({size, image, altText, margin, action, userID, showSettings}) {

    const handleOnClick = () => {
        if(action) action(userID);
        else if(showSettings) showSettings();
    }

    return (
        <img onClick={handleOnClick} alt={altText} src={image} style={{width: size, height: size, margin: margin}} className="avatar" />
    );
}

export default Avatar;