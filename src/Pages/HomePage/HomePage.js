import React, {useState} from 'react';
import "./HomePage.css";
import {BiUserCircle} from "react-icons/bi";
import {FiMoreHorizontal} from "react-icons/fi";
import {HiHeart, HiOutlineHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";

function HomePage(props) {
    return (
        <div className="homePage">
            <div className="homePageContainer">
                <div className="homePagePosts">
                    <div className="homePagePost">
                        <div className="homePagePostHeader">
                            <div className="homePagePostHeader-left">
                              <BiUserCircle /> <span className="homePagePostHeader-name">Kurt</span>
                            </div>
                            <div className="homePagePostHeader-right">
                              <FiMoreHorizontal />
                            </div>
                        </div>
                        <img src="https://cdn.oneesports.gg/cdn-data/2021/06/JujutsuKaisenPhantomParade_GojoSatoru-min.jpeg"/>

                        <div className="homePagePostFooter">
                            <div className="homePagePostActionButtons">
                                <HiOutlineHeart />
                                <FaRegComment style={{fontSize: "1.5rem", marginLeft: "1rem"}} />
                            </div>
                            <div className="homePagePostLikes">
                                <BiUserCircle />
                                <p>Liked by <span>Thomas</span> and <span>47 others</span></p>
                            </div>
                            <p className="homePagePostTitle"><span>Kurt</span> Var på byen lol</p>
                            <a className="homePagePostComments" href="">Show all 5 comments</a>
                            <p className="homePagePostDate">JULY 24</p>
                        </div>

                        <div className="homePagePostComment">
                            <VscSmiley style={{fontSize: "2rem", paddingLeft: "0.5rem", paddingTop: "0.5rem"}} />
                            <input type="text" placeholder="Write a comment..."/>
                            <button type="button">Publish</button>
                        </div>

                    </div>
                </div>
                <div className="homePageSuggestions">

                </div>
            </div>
        </div>
    );
}

export default HomePage;