import React from 'react';
import "./Message.css";

function Message({sentByUserID, text, userID}) {
    return (
        <div style={{justifyContent: sentByUserID !== userID && "flex-start"}} className="inboxRight-message">
            <p style={{background: sentByUserID !== userID && "none", border: sentByUserID !== userID && "1px solid lightgrey"}}>
                {text}
            </p>
        </div>
    );
}

export default Message;