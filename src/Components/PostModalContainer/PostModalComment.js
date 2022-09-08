import React, {useState} from 'react';
import "./PostModalComment.css";
import {VscSmiley} from "react-icons/vsc";

function PostModalComment({comment, commenterName, commenterAvatar, commenterID, commentID}) {

    const [showInputReply, setShowInputReply] = useState(false);

    const handleOnClick = (e) => {
        setShowInputReply(!showInputReply);
        e.currentTarget.parentElement.nextElementSibling.firstElementChild.nextElementSibling.focus();
    }

    return (
        <div key={commentID} className="postModalComment">
            <img src={commenterAvatar} />
            <div className="postModalComment-right">
                <p><span>{commenterName}</span> {comment}</p>
                <div className="postModalCommentDate">
                    <p>1 week</p>
                    <button onClick={handleOnClick} type="button">Reply</button>
                </div>
                <form style={{display: showInputReply && "flex"}} className="postModalCommentInputReply">
                    <VscSmiley id="smileyIcon" />
                    <input type="text" placeholder="Reply to comment..." />
                    <button type="submit">Publish</button>
                </form>
                <div className="postModalReply">
                    <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                    <div className="postModalReply-right">
                        <p className="postModalReplyText"><span>someGuy</span> text</p>
                        <p className="postModalReply-date">1 day</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostModalComment;