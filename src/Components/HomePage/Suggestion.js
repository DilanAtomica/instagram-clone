import React from 'react';
import "./Suggestion.css";
import {BiUserCircle} from "react-icons/bi";
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
                <BiUserCircle style={{fontSize: "2rem"}} />
                <p>{username}</p>
            </div>
            <button onClick={handleOnClick} type="button">Follow</button>
        </div>
    );
}

export default Suggestion;