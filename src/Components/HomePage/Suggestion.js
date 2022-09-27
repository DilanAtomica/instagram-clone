import React from 'react';
import "./Suggestion.css";
import Button from "../Buttons/Button";
import Avatar from "../Avatar/Avatar";

function Suggestion({username, userID, avatar, followUser, action}) {

    const handleOnClick = () => {
        followUser(userID);
        action(userID);
    }

    return (
        <div className="suggestion">
            <div className="suggestion-right">
                <Avatar action={action} altText={username} image={avatar} size="2rem" />
                <p onClick={action}>{username}</p>
            </div>
            <Button action={handleOnClick} fontSize={"12"} text="Follow" type="button" />
        </div>
    );
}

export default Suggestion;