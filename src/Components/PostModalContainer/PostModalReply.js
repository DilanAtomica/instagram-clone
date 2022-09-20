import React from 'react';
import "./PostModalReply.css";

function PostModalReply({reply, replierName, replierAvatar, replierID, timestamp, replyID, visitUser, getDaysSince}) {

    const handleOnUserClick = () => {
        visitUser(replierID);
    };

    return (
        <div className="postModalReply">
            <img onClick={handleOnUserClick} src={replierAvatar} />
            <div className="postModalReply-right">
                <p className="postModalReplyText"><span onClick={handleOnUserClick}>{replierName}</span> {reply}</p>
                <p className="postModalReply-date">{getDaysSince(timestamp)}</p>
            </div>
        </div>
    );
}

export default PostModalReply;