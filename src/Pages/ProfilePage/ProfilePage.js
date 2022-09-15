import React, {useState, useEffect, useContext} from 'react';
import "./ProfilePage.css";
import {BsGrid3X3} from "react-icons/bs";
import {HiOutlineHeart} from "react-icons/hi";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import ProfilePagePost from "../../Components/ProfilePage/ProfilePagePost";
import {useNavigate, useParams} from "react-router-dom";


function ProfilePage(props) {

    const {userInfo, followUser} = useContext(AppContext);
    let { userID } = useParams();
    const navigate = useNavigate();

    const [postsButton, setPostsButton] = useState(true);
    const [favoritesButton , setFavoritesButton] = useState(false);

    const [posts, setPosts] = useState([]);
    const [followingCount, setFollowingCount] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);


   useEffect(() => {
       if(userID === null) return
        getProfileInfo();
        getPosts(userID);
        getFollowingCount(userID);
        console.log("hey");
    }, [userID]);

   const getProfileInfo = async () => {
       const userDoc = doc(db, "users", userID);
       const userData = await getDoc(userDoc);
       const userResult = userData.data();
       setProfileInfo(userResult);
   }

    const getPosts = async (userID) => {
        const postsCollection = collection(db, "users", userID, "posts");
        const data = await getDocs(postsCollection);
        setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    const getFollowingCount = async(userID) => {
        const followingCountCollection = collection(db, "users", userID, "following");
        const data = await getDocs(followingCountCollection);
        setFollowingCount(data.docs.map((doc) => ({...doc.data(), id: doc.id})).length)
    }

    const handleOnClick = () => {
        followUser(userID);
    }

    return (
        <div className="profilePage">
            <div className="profilePageInfoContainer">
                <img src={profileInfo?.avatar} />
                <div className="profilePageInfo">
                    <div className="profilePageInfoTop">
                        <h1>{profileInfo?.username}</h1>
                        {userID === userInfo?.userID ?
                            <button onClick={() => navigate("/profile/" + userInfo?.userID + "/settings")} type="button">Edit Profile</button> :
                            <button onClick={handleOnClick} type="button">Follow</button>
                        }
                    </div>
                    <div className="profilePageInfoMiddle">
                        <p><span>{posts?.length}</span> Posts</p>
                        <p><span>{profileInfo?.followerCount || 0}</span> Followers</p>
                        <p><span>{followingCount}</span> Following</p>
                    </div>
                    <p className="profilePageDescription">{profileInfo?.description}</p>
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
                                         publisherID={post.publisherID}/>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ProfilePage;