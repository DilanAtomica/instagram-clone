import React, {useState, useEffect, useContext} from 'react';
import "./ProfilePage.css";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import {useNavigate, useParams} from "react-router-dom";
import ProfilePageInfoContainer from "../../Components/ProfilePage/ProfilePageInfoContainer";
import ProfilePageCategories from "../../Components/ProfilePage/ProfilePageCategories";
import ProfilePagePostsContainer from "../../Components/ProfilePage/ProfilePagePostsContainer";


function ProfilePage(props) {

    const {userInfo, followUser, unFollowUser, isFollowing, activateLoader, deActiveLoader} = useContext(AppContext);
    let { userID } = useParams();
    const navigate = useNavigate();

    const [postsButton, setPostsButton] = useState(true);

    const [alreadyFollowing, setAlreadyFollowing] = useState(false);

    const [posts, setPosts] = useState([]);
    const [followingCount, setFollowingCount] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);



   useEffect(() => {
       if(userID === null || userInfo === null) return
       activateLoader();
       getProfileInfo();
       getFollowingCount(userID);
       setAlreadyFollowing(isFollowing(userID));

       if(postsButton) getPosts(userID);
       else getFavoritedPosts(userID);

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
        deActiveLoader();
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
        deActiveLoader();
    };

    const getFollowingCount = async(userID) => {
        const followingCountCollection = collection(db, "users", userID, "following");
        const data = await getDocs(followingCountCollection);
        setFollowingCount(data.docs.map((doc) => ({...doc.data(), id: doc.id})).length);
    }

    const handleFollowClick = () => {
        followUser(userID);
        setAlreadyFollowing(true);
    };

    const handleUnFollowClick = () => {
        unFollowUser(userID);
        setAlreadyFollowing(false);
    };

    const visitProfileSettings = (userID) => {
        navigate("/profile/" + userInfo?.userID + "/settings");
    }

    const showOwnPosts = () => {
        setPostsButton(true);
    }

    const showFavorites = () => {
        setPostsButton(false);
    }



    return (
        <div className="profilePage">
            <ProfilePageInfoContainer profileInfo={profileInfo} userID={userID} alreadyFollowing={alreadyFollowing}
                                      handleFollowClick={handleFollowClick} handleUnFollowClick={handleUnFollowClick}
                                      userInfo={userInfo} visitProfileSettings={visitProfileSettings} posts={posts}
                                      followingCount={followingCount}/>

            <ProfilePageCategories showOwnPosts={showOwnPosts} showFavorites={showFavorites} postsButton={postsButton} />

            <ProfilePagePostsContainer posts={posts} />

        </div>
    );
}

export default ProfilePage;