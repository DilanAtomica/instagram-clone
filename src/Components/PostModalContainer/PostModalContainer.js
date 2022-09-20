import React, {useContext, useRef, useState} from 'react';
import "./PostModalContainer.css";
import {HiOutlineHeart, HiHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";
import {AppContext} from "../../App";
import PostModalComment from "./PostModalComment";
import {useNavigate} from "react-router-dom";

function PostModalContainer({image, text, timestamp, postID, publisherID, publisherName, publisherAvatar, commentPost, comments,
                                replyToComment, likes, likedByUser
}) {

    const {hidePostModal, likePost, userInfo, showPostModal, setPostModal} = useContext(AppContext);

    const navigate = useNavigate();

    const commentInput = useRef(null);

    const [inputValue, setInputValue] = useState("");

    const [isHeartFilled, setIsHeartFilled] = useState(likedByUser);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handleOnClick = (e) => {
        hidePostModal(e);
    };

    const focusInput = () => {
        console.log(commentInput)
        commentInput.current.focus();
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        commentPost(publisherID, postID, inputValue);
        showPostModal(image, text, timestamp, postID, publisherID);
    };

    const handleHeartClick = () => {
        if(userInfo?.userID === publisherID) return;
        setIsHeartFilled(!isHeartFilled);
        likePost(publisherID, postID);
    };

    const visitUser = (userID) => {
        setPostModal(null);
        navigate("/profile/" + userID);
    };

    return (
        <div onClick={handleOnClick} className="postModalContainer" id="postModalContainer">
        <div className="postModal">
            <div className="postModalLeft">
                <img src={image} />
            </div>
            <div className="postModalRight">
                <div className="postModalRightHeader">
                    <img src={publisherAvatar} />
                    <h1>{publisherName}</h1>
                    <span>•</span>
                    <button type="button">Follow</button>
                </div>
                <div className="postModalCommentsContainer">
                    <div className="postModalComment">
                        <img src={publisherAvatar} />
                        <div className="postModalComment-right">
                            <p><span>{publisherName}</span> {text}</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                            </div>
                        </div>
                    </div>

                    {comments.map(comment => (
                        <PostModalComment key={comment.id} commenterAvatar={comment.commenterAvatar} commenterName={comment.commenterName}
                                          commentID={comment.id} commenterID={comment.commenterID} comment={comment.comment}
                                          publisherID={publisherID} postID={postID} replyToComment={replyToComment} visitUser={visitUser}
                        />
                    ))}


                </div>
                <div className="postModalActions">
                    {isHeartFilled
                        ? <HiHeart style={{color: "red"}} onClick={handleHeartClick} id="heartIcon" />
                        : <HiOutlineHeart style={{color: "black"}} onClick={handleHeartClick} id="heartIcon" />
                    }
                    <FaRegComment id="commentIcon" onClick={focusInput} />
                </div>
                <p id="likesCounter">{likes} likes</p>
                <p id="postDate">{months[new Date(timestamp.seconds*1000).getMonth()]} {new Date(timestamp.seconds*1000).getDate()}</p>
                <form onSubmit={handleOnSubmit} className="postModalInputContainer">
                    <VscSmiley id="smileyIcon" />
                    <input ref={commentInput} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Write a comment..." />
                    <button type="submit">Publish</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default PostModalContainer;