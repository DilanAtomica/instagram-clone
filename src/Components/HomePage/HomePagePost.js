import React, {useState} from 'react';
import "./HomePagePost.css";
import {BiUserCircle} from "react-icons/bi";
import {FiMoreHorizontal} from "react-icons/fi";
import {HiOutlineHeart, HiHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";
import {useNavigate} from "react-router-dom";

function HomePagePost({image, text, username, avatar, publisherID, timestamp, postID, showPostModal, likePost, likes}) {

    const navigate = useNavigate();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [liked, setLiked] = useState(false);

    const handleOnClick = () => {
        showPostModal(image, text, timestamp, postID, publisherID);
    }

    const handleHeartClick = () => {
        setLiked(!liked);
        likePost(publisherID, postID);
    }

    return (
        <div className="homePagePost">
            <div className="homePagePostHeader">
                <div className="homePagePostHeader-left">
                    <img onClick={() => navigate("/profile/" + publisherID)} src={avatar} />
                    <span className="homePagePostHeader-name" onClick={() => navigate("/profile/" + publisherID)}>{username}</span>
                </div>
                <div className="homePagePostHeader-right">
                    <FiMoreHorizontal />
                </div>
            </div>
            <img src={image}/>

            <div className="homePagePostFooter">
                <div className="homePagePostActionButtons">
                    {liked
                        ? <HiOutlineHeart onClick={handleHeartClick} style={{color: "black"}}  id="heartIcon" />
                        : <HiHeart onClick={handleHeartClick} style={{color: "red"}} id="heartIcon" />
                    }
                    <FaRegComment style={{fontSize: "1.5rem", marginLeft: "1rem"}} />
                </div>
                <div className="homePagePostLikes">
                    <BiUserCircle />
                    <p>Liked by <span>Thomas</span> and <span>{likes} others</span></p>
                </div>
                <p className="homePagePostTitle"><span>Kurt</span> {text}</p>
                <button className="homePagePostComments" onClick={handleOnClick}>Show all comments</button>
                <p className="homePagePostDate">
                    {months[new Date(timestamp.seconds*1000).getMonth()]} {new Date(timestamp.seconds*1000).getDate()}
                </p>
            </div>

            <div className="homePagePostComment">
                <VscSmiley style={{fontSize: "2rem", paddingLeft: "0.5rem", paddingTop: "0.5rem"}} />
                <input type="text" placeholder="Write a comment..."/>
                <button type="button">Publish</button>
            </div>

        </div>
    );
}

export default HomePagePost;