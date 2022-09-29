import React from 'react';
import "./Suggestion.css";
import Button from "../Buttons/Button";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";

function Suggestion({username, userID, avatar, followUser, action}) {

    const handleOnClick = () => {
        followUser(userID);
        action(userID);
    }

    return (
        <li className="suggestion">
            <div className="suggestion-right">
                <Avatar action={action} altText={username} image={avatar} size="2rem" />
                <Username visitProfilePage={action} username={username} userID={userID}
                          fontSize={14} margin="0 0 0 0.5rem"
                />
            </div>
            <Button action={handleOnClick} fontSize={"12"} text="Follow" type="button" margin="0 0 0 0.5rem" />
        </li>
    );
}

export default Suggestion;