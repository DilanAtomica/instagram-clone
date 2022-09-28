import React from 'react';
import "./PostingModalDescription.css";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";

function PostingModalDescription({userInfo, visitProfilePage, setTextInput}) {
    return (
        <div className="postingModalDescription">
            <div className="postingModalProfile">
                <Avatar action={visitProfilePage} userID={userInfo?.userID} image={userInfo?.avatar}
                        altText={userInfo?.username} size="1.5rem" margin="0 0.5rem 0.5rem 0" />
                <Username visitProfilePage={visitProfilePage} username={userInfo?.username}
                          userID={userInfo?.userID} fontSize={16} margin="0 0 0.5rem 0"/>
            </div>
            <textarea onChange={(e) => setTextInput(e.target.value)}
                      rows="10" placeholder="Write a subtitle..." />
        </div>
    );
}

export default PostingModalDescription;