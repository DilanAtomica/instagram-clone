import React from 'react';
import "./ProfilePageCategories.css";
import {BsGrid3X3} from "react-icons/bs";
import {HiOutlineHeart} from "react-icons/hi";

function ProfilePageCategories({showOwnPosts, showFavorites, postsButton}) {
    return (
        <div className="profilePageCategories">
            <button onClick={showOwnPosts} style={{borderTop: postsButton && "1px solid black", color: postsButton && "#262626"}}
                    type="button"><BsGrid3X3 id="gridIcon" /> Posts</button>
            <button onClick={showFavorites} style={{borderTop: !postsButton && "1px solid black", color: !postsButton && "#262626"}}
                    type="button"><HiOutlineHeart id="gridIcon" /> Favorites</button>
        </div>
    );
}

export default ProfilePageCategories;