import React from 'react';
import "./PostModalReply.css";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";

function PostModalReply({reply, replierName, replierAvatar, replierID, timestamp, replyID, getDaysSince, visitProfilePage}) {

    return (
        <div className="postModalReply">
            <Avatar action={visitProfilePage} userID={replierID} image={replierAvatar} altText={replierName} size="2.5rem" margin="0 1rem 0 0" />
            <div className="postModalReply-right">
                <p className="postModalReplyText">
                    <Username visitProfilePage={visitProfilePage} username={replierName}
                              userID={replierID} fontSize={14} margin=""/> {reply}</p>
                <p className="postModalReply-date">{getDaysSince(timestamp)}</p>
            </div>
        </div>
    );
}

export default PostModalReply;