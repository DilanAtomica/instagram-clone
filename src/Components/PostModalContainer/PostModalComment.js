import React, {useEffect, useState} from 'react';
import "./PostModalComment.css";
import {VscSmiley} from "react-icons/vsc";
import PostModalReply from "./PostModalReply";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";
import {useNavigate} from "react-router-dom";

function PostModalComment({comment, commenterName, commenterAvatar, commenterID, commentID, publisherID, postID, replyToComment, timestamp,
                              visitUser, getDaysSince,visitProfilePage}) {

    const navigate = useNavigate();

    const [showInputReply, setShowInputReply] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [replies, setReplies] = useState(null);

    useEffect(() => {
        getReplies();
        console.log("hey");
    }, []);

    const handleOnClick = () => {
        setShowInputReply(!showInputReply);
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        try {
            replyToComment(publisherID, postID, commentID, inputValue);
            getReplies();
            setInputValue("");
            setShowInputReply(false);
        } catch {
            navigate("/error");
        }
    };

    const getReplies = async() => {
        try {
            const repliesCollection = collection(db, "users", publisherID, "posts", postID, "comments", commentID, "replies");
            const repliesData = await getDocs(repliesCollection);
            const repliesResults = repliesData.docs.map((doc) => ({...doc.data(), id: doc.id}));

            for(let i = 0; i < repliesResults.length; i++) {
                const commenterDoc = doc(db, "users", repliesResults[i].replierID);
                const commenterData = await getDoc(commenterDoc);
                const commenterResult = commenterData.data();
                repliesResults[i] = {...repliesResults[i], replierAvatar: commenterResult.avatar};
            }

            setReplies(repliesResults);
        } catch {
            navigate("/error");
        }
    }

    return (
        <div key={commentID} className="postModalComment">
            <Avatar action={visitProfilePage} userID={commenterID} image={commenterAvatar} altText={commenterName} size="2.5rem" margin="0 1rem 0 0" />
            <div className="postModalComment-right">
                <p><Username visitProfilePage={visitProfilePage} username={commenterName}
                             userID={commenterID} fontSize={14} margin="0.20rem 0.25rem 0.5rem 0"/> {comment}</p>
                <div className="postModalCommentDate">
                    <p>{getDaysSince(timestamp)}</p>
                    <button onClick={handleOnClick} type="button">Reply</button>
                </div>
                <form onSubmit={handleOnSubmit} style={{display: showInputReply && "flex"}} className="postModalCommentInputReply">
                    <VscSmiley id="smileyIcon" />
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Reply to comment..." />
                    <button type="submit">Publish</button>
                </form>
                {replies?.map(reply => (
                    <PostModalReply key={reply?.id} replyID={reply?.id} replierName={reply?.replierName} replierAvatar={reply?.replierAvatar}
                                    replierID={reply?.replierID} timestamp={reply?.timestamp} reply={reply?.reply} visitUser={visitUser}
                                    getDaysSince={getDaysSince} visitProfilePage={visitProfilePage}
                    />
                ))}
            </div>
        </div>
    );
}

export default PostModalComment;