import React, {useState, useEffect, useContext} from 'react';
import "./ProfilePage.css";
import {BsGrid3X3} from "react-icons/bs";
import {HiOutlineHeart} from "react-icons/hi";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import ProfilePagePost from "../../Components/ProfilePage/ProfilePagePost";


function ProfilePage(props) {

    const {userInfo} = useContext(AppContext);

    const [postsButton, setPostsButton] = useState(true);
    const [favoritesButton , setFavoritesButton] = useState(false);

    const [posts, setPosts] = useState([]);
    const [followingCount, setFollowingCount] = useState(null);


   useEffect(() => {
       if(userInfo === null) return
        getPosts();
        getFollowingCount();
        console.log("hey");
    }, [userInfo]);

    const getPosts = async () => {
        const postsCollection = collection(db, "users", userInfo.userID, "posts");
        const data = await getDocs(postsCollection);
        setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    const getFollowingCount = async() => {
        const followingCountCollection = collection(db, "users", userInfo.userID, "following");
        const data = await getDocs(followingCountCollection);
        setFollowingCount(data.docs.map((doc) => ({...doc.data(), id: doc.id})).length)
    }

    return (
        <div className="profilePage">
            <div className="profilePageInfoContainer">
                <img src={userInfo?.avatar} />
                <div className="profilePageInfo">
                    <div className="profilePageInfoTop">
                        <h1>{userInfo?.username}</h1>
                        <button type="button">Edit Profile</button>
                    </div>
                    <div className="profilePageInfoMiddle">
                        <p><span>{posts?.length}</span> Posts</p>
                        <p><span>{userInfo?.followerCount || 0}</span> Followers</p>
                        <p><span>{followingCount}</span> Following</p>
                    </div>
                    <p className="profilePageDescription">{userInfo?.description}</p>
                </div>
            </div>
            <div className="profilePagePostsContainer">
                <div className="profilePageCategories">
                    <button style={{borderTop: postsButton && "1px solid black", color: postsButton && "#262626"}}
                            type="button"><BsGrid3X3 id="gridIcon" /> Posts</button>
                    <button style={{borderTop: favoritesButton && "1px solid black", color: favoritesButton && "#262626"}}
                            type="button"><HiOutlineHeart id="gridIcon" /> Favorites</button>
                </div>
                <div className="profilePagePosts">
                    {posts.map(post => (
                        <ProfilePagePost key={post.id} image={post.image} text={post.text} timestamp={post.timestamp} postID={post.id}
                                         publisherID={post.publisherID}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ProfilePage;