import React from 'react';
import "./Message.css";

function Message({sentByUserID, text, userID}) {
    return (
        <li style={{justifyContent: sentByUserID !== userID && "flex-start"}} className="inboxRight-message">
            <p style={{background: sentByUserID !== userID && "none", border: sentByUserID !== userID && "1px solid lightgrey"}}>
                {text}
            </p>
        </li>
    );
}

export default Message;