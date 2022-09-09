import React, {useContext, useEffect} from 'react';
import "./HomePage.css";
import {BiUserCircle} from "react-icons/bi";
import {FiMoreHorizontal} from "react-icons/fi";
import {HiHeart, HiOutlineHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";
import {AppContext} from "../../App";
import HomePagePost from "../../Components/HomePage/HomePagePost";

function HomePage(props) {

    const {userSuggestions, followUser} = useContext(AppContext);

    useEffect(() => {
        console.log("STOPP");
    }, []);

    return (
        <div className="homePage">
            <div className="homePageContainer">
                <div className="homePagePosts">
                    <HomePagePost />
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
                        {userSuggestions?.map(user => (
                            <div key={user.id} className="suggestion">
                                <div className="suggestion-right">
                                    <BiUserCircle style={{fontSize: "2rem"}} />
                                    <p>{user.username}</p>
                                </div>
                                <button onClick={() => followUser(user.id)} type="button">Follow</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePage;