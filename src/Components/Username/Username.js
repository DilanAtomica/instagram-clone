import React from 'react';
import "./Username.css";

function Username({visitProfilePage, username, userID, fontSize, margin}) {

    const handleOnClick = () => {
        visitProfilePage(userID);
    }

    return (
        <div onClick={handleOnClick} className="username" style={{fontSize: fontSize + "px", margin: margin}}>{username}</div>
    );
}

export default Username;