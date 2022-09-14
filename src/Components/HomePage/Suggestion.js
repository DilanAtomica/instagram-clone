import React from 'react';
import "./Suggestion.css";
import {useNavigate} from "react-router-dom";

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
            <button onClick={handleOnClick} type="button">Follow</button>
        </div>
    );
}

export default Suggestion;