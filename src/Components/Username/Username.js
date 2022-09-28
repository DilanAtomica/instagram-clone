import React from 'react';
import "./Username.css";

function Username({visitProfilePage, username, userID, fontSize, margin}) {

    const handleOnClick = () => {
        visitProfilePage(userID);
    }

    return (
        <span onClick={handleOnClick} className="username" style={{fontSize: fontSize + "px", margin: margin}}>{username}</span>
    );
}

export default Username;