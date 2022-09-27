import React from 'react';
import "./MessageModalSuggestion.css";
import {HiCheck} from "react-icons/hi";
import Avatar from "../Avatar/Avatar";

function MessageModalSuggestion({username, userID, avatar, chooseUser, chosenUser}) {

    const handleOnClick = () => {
        chooseUser(userID)
    };

    return (
        <div onClick={handleOnClick} className="messageModalSuggestion">
            <div className="messageModalSuggestion-left">
                <Avatar altText={username} image={avatar} size="2.5rem" margin="0 0.75rem 0 1.25rem" />
                <h3>{username}</h3>
            </div>
            <div id="checkIcon" style={{backgroundColor: chosenUser === userID && "#0095F6", border: chosenUser === userID && "none"}}>
                {chosenUser === userID && <HiCheck id="checkMarkIcon" />}
            </div>
        </div>
    );
}

export default MessageModalSuggestion;