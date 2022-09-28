import React from 'react';
import "./HomePageSuggestionsContainer.css";
import Suggestion from "./Suggestion";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";

function HomePageSuggestionsContainer({userSuggestions, userInfo, visitProfilePage, followUser}) {
    return (
        <div className="homePageSuggestionsContainer">
            <div className="suggestionHeader">
                <Avatar action={visitProfilePage} userID={userInfo?.userID} size="3.75rem"
                        altText={userInfo?.username} image={userInfo?.avatar} />
                <Username visitProfilePage={visitProfilePage} username={userInfo?.username} userID={userInfo?.userID}
                          fontSize={14} margin="0 0 0 1rem"/>
            </div>

            <p className="suggestionsHeader">Suggestions for you</p>

            <div className="suggestions">
                {userSuggestions?.map(user => (
                    <Suggestion action={visitProfilePage} key={user.id} username={user.username} userID={user.id} avatar={user.avatar}
                                followUser={followUser}/>
                ))}
            </div>
        </div>
    );
}

export default HomePageSuggestionsContainer;