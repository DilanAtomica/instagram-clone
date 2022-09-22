import React from 'react';
import "./MessageModalSuggestion.css";
import {HiCheck} from "react-icons/hi";

function MessageModalSuggestion({username, userID, avatar, chooseUser, chosenUser}) {

    const handleOnClick = () => {
        chooseUser(userID)
    };

    return (
        <div onClick={handleOnClick} className="messageModalSuggestion">
            <div className="messageModalSuggestion-left">
                <img alt={username} src={avatar} />
                <h3>{username}</h3>
            </div>
            <div id="checkIcon" style={{backgroundColor: chosenUser === userID && "#0095F6", border: chosenUser === userID && "none"}}>
                {chosenUser === userID && <HiCheck id="checkMarkIcon" />}
            </div>
        </div>
    );
}

export default MessageModalSuggestion;