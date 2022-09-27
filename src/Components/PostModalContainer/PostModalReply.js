import React from 'react';
import "./PostModalReply.css";
import Avatar from "../Avatar/Avatar";

function PostModalReply({reply, replierName, replierAvatar, replierID, timestamp, replyID, visitUser, getDaysSince, visitProfilePage}) {

    const handleOnUserClick = () => {
        visitUser(replierID);
    };

    return (
        <div className="postModalReply">
            <Avatar action={visitProfilePage} userID={replierID} image={replierAvatar} altText={replierName} size="2.5rem" margin="0 1rem 0 0" />
            <div className="postModalReply-right">
                <p className="postModalReplyText"><span onClick={handleOnUserClick}>{replierName}</span> {reply}</p>
                <p className="postModalReply-date">{getDaysSince(timestamp)}</p>
            </div>
        </div>
    );
}

export default PostModalReply;