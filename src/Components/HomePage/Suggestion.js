import React from 'react';
import "./Suggestion.css";
import {useNavigate} from "react-router-dom";
import Button from "../Buttons/Button";

function Suggestion({username, userID, avatar, followUser}) {

    const navigate = useNavigate();

    const handleOnClick = () => {
        followUser(userID);
        navigate("/profile/" + userID)
    }

    return (
        <div className="suggestion">
            <div className="suggestion-right">
                <img onClick={() => navigate("/profile/" + userID)} alt={username} src={avatar} />
                <p onClick={() => navigate("/profile/" + userID)}>{username}</p>
            </div>
            <Button onClick={handleOnClick} fontSize={"12"} text="Follow" type="button" />
        </div>
    );
}

export default Suggestion;