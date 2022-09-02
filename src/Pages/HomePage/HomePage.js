import React, {useState} from 'react';
import "./HomePage.css";
import {BiUserCircle} from "react-icons/bi";
import {FiMoreHorizontal} from "react-icons/fi";
import {HiHeart, HiOutlineHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";
import {TiDeleteOutline} from "react-icons/ti";

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
                <div className="homePageSuggestionsContainer">
                    <div className="suggestionsAvatar">
                            <BiUserCircle style={{fontSize: "5rem"}} />
                            <p>Anton</p>
                    </div>
                    <div className="suggestions">
                        <div className="suggestionsHeader">
                            <p>Suggestions for you</p>
                            <a href="">See all</a>
                        </div>
                        <div className="suggestion">
                            <div className="suggestion-right">
                                <BiUserCircle style={{fontSize: "2rem"}} />
                                <p>Ole</p>
                            </div>
                            <button type="button">Follow</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="darkBackground">
                <div className="postingModalContainer">
                    <div className="postingModalHeader">
                        <TiDeleteOutline style={{fontSize: "1.75rem"}} />
                        <h2>Create a new post</h2>
                        <button type="button">Del</button>
                    </div>
                    <div className="postingModalContent">
                        <div className="postingModalContent-left">
                            <img src="https://previews.123rf.com/images/kurhan/kurhan1103/kurhan110300100/9050894-happy-man.jpg" />
                        </div>
                        <div className="postingModalContent-right">
                            <div className="postingModalProfile">
                                <BiUserCircle style={{fontSize: "1.5rem"}} />
                                <p>Frillo</p>
                            </div>
                            <textarea rows="10" placeholder="Write a subtitle..." />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default HomePage;