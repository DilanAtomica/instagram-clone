import React, {useContext, useRef, useState} from 'react';
import "./PostModalContainer.css";
import {HiHeart, HiOutlineHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";
import {AppContext} from "../../App";
import PostModalComment from "./PostModalComment";
import {useNavigate} from "react-router-dom";
import Button from "../Buttons/Button";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";

function PostModalContainer({image, text, timestamp, postID, publisherID, publisherName, publisherAvatar, commentPost, comments,
                                replyToComment, likes, likedByUser, alreadyFollowing
}) {

    const {hidePostModal, likePost, userInfo, showPostModal, setPostModal, getDaysSince, followUser, unFollowUser} = useContext(AppContext);

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
        try {
            commentPost(publisherID, postID, inputValue);
            setInputValue("");
            showPostModal(image, text, timestamp, postID, publisherID);
        } catch {
            navigate("/error");
        }
    };

    const handleHeartClick = () => {
        if(userInfo?.userID === publisherID) return;
        try {
            setIsHeartFilled(!isHeartFilled);
            likePost(publisherID, postID);
        } catch {
            navigate("/error");
        }
    };

    const handleFollowClick = () => {
        try {
            followUser(publisherID);
            showPostModal(image, text, timestamp, postID, publisherID);
        } catch {
            navigate("/error");
        }
    }

    const handleUnFollowClick = () => {
        try {
            unFollowUser(publisherID);
            showPostModal(image, text, timestamp, postID, publisherID);
        } catch {
            navigate("/error");
        }
    }

    const visitProfilePage = (userID) => {
        setPostModal(null);
        navigate("/profile/" + userID);
    }



    return (
        <div onClick={handleOnClick} className="postModalContainer" id="postModalContainer">
        <div className="postModal">
            <div className="postModalLeft">
                <img alt={text} src={image} />
            </div>
            <div className="postModalRight">
                <div className="postModalRightHeader">
                    <Avatar action={visitProfilePage} userID={publisherID} image={publisherAvatar}
                            altText={publisherName} size="2.5rem" margin="0 0.75rem 0 1rem" />
                    <Username visitProfilePage={visitProfilePage} username={publisherName}
                              userID={publisherID} fontSize={14} margin="0 0.5rem 0 0"/>
                    <span>•</span>
                    {publisherID === userInfo?.userID ? "" : alreadyFollowing
                        ?  <Button action={handleUnFollowClick} fontSize="14" type="button" text="Unfollow" />
                        :  <Button action={handleFollowClick} fontSize="14" type="button" text="Follow" />
                    }
                </div>
                <div className="postModalCommentsContainer">
                    <div className="postModalComment">
                        <Avatar action={visitProfilePage} userID={publisherID} image={publisherAvatar}
                                altText={publisherName} size="2.5rem" margin="0 0.75rem 0 0" />
                        <div className="postModalComment-right">
                            <p><Username visitProfilePage={visitProfilePage} username={publisherName}
                                         userID={publisherID} fontSize={14} margin="0 0.25rem 0 0"/> {text}</p>
                            <div className="postModalCommentDate">
                                <p>{getDaysSince(timestamp)}</p>
                            </div>
                        </div>
                    </div>

                    {comments.map(comment => (
                        <PostModalComment key={comment?.id} commenterAvatar={comment?.commenterAvatar} commenterName={comment?.commenterName}
                                          commentID={comment.id} commenterID={comment?.commenterID} comment={comment?.comment}
                                          publisherID={publisherID} postID={postID} replyToComment={replyToComment} timestamp={comment?.timestamp}
                                          getDaysSince={getDaysSince} visitProfilePage={visitProfilePage}

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
                    <input value={inputValue} ref={commentInput} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Write a comment..." />
                    <Button text="Publish" type="submit" margin="0 1rem 0 0" fontSize="14" />
                </form>
            </div>
        </div>
        </div>
    );
}

export default PostModalContainer;