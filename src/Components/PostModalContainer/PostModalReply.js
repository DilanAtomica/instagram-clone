import React from 'react';
import "./PostModalReply.css";

function PostModalReply({reply, replierName, replierAvatar, replierID, timestamp, replyID}) {
    return (
        <div className="postModalReply">
            <img src={replierAvatar} />
            <div className="postModalReply-right">
                <p className="postModalReplyText"><span>{replierName}</span> {reply}</p>
                <p className="postModalReply-date">1 day</p>
            </div>
        </div>
    );
}

export default PostModalReply;