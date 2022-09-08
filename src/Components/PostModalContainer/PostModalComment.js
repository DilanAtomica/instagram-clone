import React, {useEffect, useState} from 'react';
import "./PostModalComment.css";
import {VscSmiley} from "react-icons/vsc";
import PostModalReply from "./PostModalReply";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";

function PostModalComment({comment, commenterName, commenterAvatar, commenterID, commentID, publisherID, postID, replyToComment}) {

    const [showInputReply, setShowInputReply] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [replies, setReplies] = useState(null);

    const handleOnClick = (e) => {
        setShowInputReply(!showInputReply);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        replyToComment(publisherID, postID, commentID, inputValue);
        getReplies();
        setInputValue("");
        setShowInputReply(false);
    };

    const getReplies = async() => {
        const repliesCollection = collection(db, "users", publisherID, "posts", postID, "comments", commentID, "replies");
        const repliesData = await getDocs(repliesCollection);
        const repliesResults = repliesData.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setReplies(repliesResults);
    }

    useEffect(() => {
        getReplies();
        console.log("hey");
    }, []);

    return (
        <div key={commentID} className="postModalComment">
            <img src={commenterAvatar} />
            <div className="postModalComment-right">
                <p><span>{commenterName}</span> {comment}</p>
                <div className="postModalCommentDate">
                    <p>1 week</p>
                    <button onClick={handleOnClick} type="button">Reply</button>
                </div>
                <form onSubmit={handleOnSubmit} style={{display: showInputReply && "flex"}} className="postModalCommentInputReply">
                    <VscSmiley id="smileyIcon" />
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Reply to comment..." />
                    <button type="submit">Publish</button>
                </form>
                {replies?.map(reply => (
                    <PostModalReply key={reply.id} replyID={reply.id} replierName={reply.replierName} replierAvatar={reply.replierAvatar} replierID={reply.replierID}
                                    timestamp={reply.timestamp} reply={reply.reply}
                    />
                ))}
            </div>
        </div>
    );
}

export default PostModalComment;