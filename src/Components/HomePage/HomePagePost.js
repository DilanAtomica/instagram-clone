import React, {useRef, useState} from 'react';
import "./HomePagePost.css";
import {HiHeart, HiOutlineHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";
import Button from "../Buttons/Button";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";
import {useNavigate} from "react-router-dom";

function HomePagePost({image, text, username, avatar, publisherID, timestamp, postID, showPostModal, likePost, likes, isLiked,
                          randomUserLikeName, randomUserLikeAvatar, randomUserID, commentPost, visitProfilePage}) {

    const navigate = useNavigate();

    const commentInput = useRef(null);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [isHeartFilled, setIsHeartFilled] = useState(isLiked);

    const [inputComment, setInputComment] = useState("");

    const handleOnClick = () => {
        showPostModal(image, text, timestamp, postID, publisherID);
    };

    const handleHeartClick = () => {
        try {
            setIsHeartFilled(!isHeartFilled);
            likePost(publisherID, postID);
        } catch {
            navigate("/error");
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        try {
            commentPost(publisherID, postID, inputComment);
            setInputComment("");
            showPostModal(image, text, timestamp, postID, publisherID);
        } catch {
            navigate("/error");
        }
    };

    const focusInput = () => {
        commentInput.current.focus();
    };

    return (
        <li className="homePagePost">
            <header className="homePagePostHeader">
                    <Avatar action={visitProfilePage} userID={publisherID} image={avatar} altText={username} size="2.25rem" />
                    <Username visitProfilePage={visitProfilePage} username={username} userID={publisherID}
                              fontSize={13} margin="0 0 0 0.5rem"/>
            </header>
            <img alt={text} src={image}/>

            <div className="homePagePostFooter">
                <div className="homePagePostActionButtons">
                    <button type="button">
                    {isHeartFilled
                        ? <HiHeart onClick={handleHeartClick} style={{color: "red"}} id="heartIcon" />
                        : <HiOutlineHeart onClick={handleHeartClick} style={{color: "black"}}  id="heartIcon" />
                    }
                    </button>
                    <button type="button">
                    <FaRegComment onClick={focusInput} id="commentIcon" style={{fontSize: "1.5rem", marginLeft: "0.5rem"}} />
                    </button>
                </div>
                <div className="homePagePostLikes">
                    {randomUserLikeName && <Avatar action={visitProfilePage} userID={randomUserID} image={randomUserLikeAvatar} altText={randomUserLikeName} size="1.5rem" />}
                    {randomUserLikeName
                        ? <p>Liked by <Username visitProfilePage={visitProfilePage} username={randomUserLikeName} userID={randomUserID}
                                                fontSize={14}
                        /> and <span>{likes} others</span></p>
                        : <p><span>{likes} likes</span></p>
                    }

                </div>
                <p className="homePagePostTitle">
                    <Username visitProfilePage={visitProfilePage} username={username}
                              userID={randomUserID} fontSize={14} margin="0 0 0 0rem"/>
                    <span> {text}</span>

                </p>
                <button type="button" className="homePagePostComments" onClick={handleOnClick}>Show all comments</button>
                <p className="homePagePostDate">
                    {months[new Date(timestamp.seconds*1000).getMonth()]} {new Date(timestamp.seconds*1000).getDate()}
                </p>
            </div>

            <form onSubmit={handleOnSubmit} className="homePagePostComment">
                <VscSmiley style={{fontSize: "2rem", paddingLeft: "0.5rem", paddingTop: "0.5rem"}} />
                <input ref={commentInput} value={inputComment} onChange={(e) => setInputComment(e.target.value)} type="text" placeholder="Write a comment..."/>
                <Button padding="0.75rem 0.5rem 0.5rem" fontSize="14" text="Publish" type="submit" />
            </form>

        </li>
    );
}

export default HomePagePost;