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

    const {userInfo, followUser, unFollowUser, isFollowing} = useContext(AppContext);
    let { userID } = useParams();
    const navigate = useNavigate();

    const [postsButton, setPostsButton] = useState(true);

    const [alreadyFollowing, setAlreadyFollowing] = useState(false);

    const [posts, setPosts] = useState([]);
    const [followingCount, setFollowingCount] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);



   useEffect(() => {
       if(userID === null || userInfo === null) return
        getProfileInfo();
       if(postsButton) {
           getPosts(userID);
       } else {
           getFavoritedPosts(userID);
       }

        getFollowingCount(userID);
        setAlreadyFollowing(isFollowing(userID));
        console.log("hey");
    }, [userID, postsButton, userInfo]);


   const getProfileInfo = async () => {
       const userDoc = doc(db, "users", userID);
       const userData = await getDoc(userDoc);
       const userResult = userData.data();
       setProfileInfo(userResult);
   }

    const getPosts = async (userID) => {
        const postsCollection = collection(db, "users", userID, "posts");
        const data = await getDocs(postsCollection);
        let posts = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        posts.sort(function(a, b) {
            if(a.timestamp?.seconds < b.timestamp?.seconds) return 1;
            else return -1;
                });
        setPosts(posts);
    };

    const getFavoritedPosts = async (userID) => {
        const favoritedPostsCollection = collection(db, "users", userID, "favorited");
        const data = await getDocs(favoritedPostsCollection);
        let posts = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        posts.sort(function(a, b) {
            if(a.timestamp?.seconds < b.timestamp?.seconds) return 1;
            else return -1;
        });

        let favoritedPosts = [];

        for(let i = 0; i < posts.length; i++) {
            const postDoc = doc(db, "users", posts[i].publisherID, "posts", posts[i].postID);
            const docData = await getDoc(postDoc);
            let docResult = docData.data();
            docResult = {...docResult, id: docData.id};
            favoritedPosts.push(docResult);
            console.log(docResult);
        }

        setPosts(favoritedPosts);
    };

    const getFollowingCount = async(userID) => {
        const followingCountCollection = collection(db, "users", userID, "following");
        const data = await getDocs(followingCountCollection);
        setFollowingCount(data.docs.map((doc) => ({...doc.data(), id: doc.id})).length)
    }

    const handleFollowClick = () => {
        followUser(userID);
        setAlreadyFollowing(true);
    };

    const handleUnFollowClick = () => {
        unFollowUser(userID);
        setAlreadyFollowing(false);
    }



    return (
        <div className="profilePage">
            <div className="profilePageInfoContainer">
                <img src={profileInfo?.avatar} />
                <div className="profilePageInfo">
                    <div className="profilePageInfoTop">
                        <h1>{profileInfo?.username}</h1>
                        {userID === userInfo?.userID
                            ? <button onClick={() => navigate("/profile/" + userInfo?.userID + "/settings")} type="button">Edit Profile</button>
                            : alreadyFollowing ? <button onClick={handleUnFollowClick} type="button">Unfollow</button>
                            : <button onClick={handleFollowClick} type="button">Follow</button>
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
                    <button onClick={() => setPostsButton(true)} style={{borderTop: postsButton && "1px solid black", color: postsButton && "#262626"}}
                            type="button"><BsGrid3X3 id="gridIcon" /> Posts</button>
                    <button onClick={() => setPostsButton(false)} style={{borderTop: !postsButton && "1px solid black", color: !postsButton && "#262626"}}
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