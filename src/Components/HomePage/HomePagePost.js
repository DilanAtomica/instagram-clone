import React from 'react';
import "./HomePagePost.css";
import {BiUserCircle} from "react-icons/bi";
import {FiMoreHorizontal} from "react-icons/fi";
import {HiOutlineHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";

function HomePagePost({image, text, username, avatar}) {
    return (
        <div className="homePagePost">
            <div className="homePagePostHeader">
                <div className="homePagePostHeader-left">
                    <img src={avatar} /> <span className="homePagePostHeader-name">{username}</span>
                </div>
                <div className="homePagePostHeader-right">
                    <FiMoreHorizontal />
                </div>
            </div>
            <img src={image}/>

            <div className="homePagePostFooter">
                <div className="homePagePostActionButtons">
                    <HiOutlineHeart />
                    <FaRegComment style={{fontSize: "1.5rem", marginLeft: "1rem"}} />
                </div>
                <div className="homePagePostLikes">
                    <BiUserCircle />
                    <p>Liked by <span>Thomas</span> and <span>47 others</span></p>
                </div>
                <p className="homePagePostTitle"><span>Kurt</span> {text}</p>
                <a className="homePagePostComments" href="">Show all 5 comments</a>
                <p className="homePagePostDate">JULY 24</p>
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