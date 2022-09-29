import React from 'react';
import "./SearchResultProfile.css";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";

function SearchResultProfile({username, userID, avatar, visitProfilePage}) {

    const handleOnClick = () => {
        visitProfilePage(userID);
    }

    return (
        <li className="searchResultProfile">
            <Avatar action={visitProfilePage} userID={userID} size="10rem"
                    altText={username} image={avatar} />
            <Username visitProfilePage={visitProfilePage} username={username} userID={userID}
                      fontSize={25} margin="0.5rem 0 0.5rem 0"
            />
            <button onClick={handleOnClick} type="button">Visit Profile</button>
        </li>
    );
}

export default SearchResultProfile;