import React from 'react';
import "./ProfilePageInfoContainer.css";
import Avatar from "../Avatar/Avatar";

function ProfilePageInfoContainer({profileInfo, userID, alreadyFollowing, handleFollowClick, handleUnFollowClick, userInfo,
                                      visitProfileSettings, posts, followingCount}) {

    const handleOnClick = () => {
        visitProfileSettings(userInfo?.userID);
    }
    return (
        <div className="profilePageInfoContainer">
            <Avatar image={profileInfo?.avatar} altText={profileInfo?.username} size="10rem" margin="0 7rem 0 4rem" />
            <div className="profilePageInfo">
                <div className="profilePageInfoTop">
                    <h1>{profileInfo?.username}</h1>
                    {userID === userInfo?.userID
                        ? <button onClick={handleOnClick} type="button">Edit Profile</button>
                        : alreadyFollowing ? <button onClick={handleUnFollowClick} type="button">Unfollow</button>
                            : <button onClick={handleFollowClick} type="button">Follow</button>
                    }
                </div>
                <div className="profilePageInfoMiddle">
                    <p><span>{posts?.length}</span> Posts</p>
                    <p><span>{profileInfo?.followerCount || 0}</span> Followers</p>
                    <p style={{marginRight: "0"}}><span>{followingCount}</span> Following</p>
                </div>
                <p className="profilePageDescription">{profileInfo?.description}</p>
            </div>
        </div>
    );
}

export default ProfilePageInfoContainer;