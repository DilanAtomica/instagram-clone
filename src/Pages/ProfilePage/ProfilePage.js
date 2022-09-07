import React, {useState} from 'react';
import "./ProfilePage.css";
import {BsGrid3X3} from "react-icons/bs";
import {HiOutlineHeart} from "react-icons/hi";

function ProfilePage(props) {

    const [postsButton, setPostsButton] = useState(true);
    const [favoritesButton , setFavoritesButton] = useState(false);

    return (
        <div className="profilePage">
            <div className="profilePageInfoContainer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Hayao_Miyazaki_cropped_1_Hayao_Miyazaki_201211.jpg" />
                <div className="profilePageInfo">
                    <div className="profilePageInfoTop">
                        <h1>coolguy1</h1>
                        <button type="button">Edit Profile</button>
                    </div>
                    <div className="profilePageInfoMiddle">
                        <p><span>0</span> Posts</p>
                        <p><span>0</span> Followers</p>
                        <p><span>0</span> Follow</p>
                    </div>
                    <p className="profilePageDescription">I love to be happy lol</p>
                </div>
            </div>
            <div className="profilePagePostsContainer">
                <div className="profilePageCategories">
                    <button className={postsButton && "profilePageButtonActive"} type="button"><BsGrid3X3 id="gridIcon" /> Posts</button>
                    <button className={favoritesButton && "profilePageButtonActive"} type="button"><HiOutlineHeart id="gridIcon" /> Favorites</button>
                </div>
                <div className="profilePagePosts">
                    <img src="https://i1.sndcdn.com/artworks-000127213193-ox27bh-t500x500.jpg" />
                    <img src="https://i.pinimg.com/474x/ad/b6/c1/adb6c1b4978119a74628fbd22a738c67.jpg" />
                    <img src="https://i.pinimg.com/564x/87/4b/15/874b15650e325a0633dfeeacad430c59.jpg" />
                    <img src="https://i.pinimg.com/474x/a7/ec/e5/a7ece5817469145d25be8feca71056f8.jpg" />
                    <img src="https://i.pinimg.com/564x/40/0b/6e/400b6e47c96494ed306fef0766bfbaff.jpg" />
                    <img src="https://i.pinimg.com/564x/3b/36/17/3b3617674cda4a822038b7772cb81140.jpg" />

                </div>
            </div>

        </div>
    );
}

export default ProfilePage;