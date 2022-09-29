import React from 'react';
import "./ChatUser.css";
import Avatar from "../Avatar/Avatar";

function ChatUser({userID, username, avatar, showChosenChat}) {

    const handleOnClick = () => {
        showChosenChat(userID, username, avatar);
    }

    return (
        <li onClick={handleOnClick} className="chatUser">
            <button type="button">
                <Avatar altText={username} image={avatar} size="4rem" margin="0 0.75rem 0 1.25rem" />
                <h2>{username}</h2>
            </button>
        </li>
    );
}

export default ChatUser;