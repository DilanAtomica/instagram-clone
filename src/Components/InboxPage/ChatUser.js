import React from 'react';
import "./ChatUser.css";

function ChatUser({userID, username, avatar}) {
    return (
        <div className="chatUser">
            <img alt={username} src={avatar} />
            <h2>{username}</h2>
        </div>
    );
}

export default ChatUser;