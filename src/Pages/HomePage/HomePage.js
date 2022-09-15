import React, {useContext, useEffect, useState} from 'react';
import "./HomePage.css";
import {AppContext} from "../../App";
import HomePagePost from "../../Components/HomePage/HomePagePost";
import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebase";
import Suggestion from "../../Components/HomePage/Suggestion";
import {useNavigate} from "react-router-dom";

function HomePage(props) {

    const navigate = useNavigate();

    const {followUser, userInfo, showPostModal} = useContext(AppContext);

    const [followingPosts, setFollowingPosts] = useState(null);
    const [userSuggestions, setUserSuggestions] = useState(null);

    useEffect(() => {
        if(userInfo === null) return;
        getFollowingPosts();
        getUserSuggestions();
        console.log("STOPP");
    }, [userInfo]);

    const getUserSuggestions = async() => {
        const usersCollection = collection(db, "users");
        const usersData = await getDocs(usersCollection);
        let userResult = usersData.docs.map((doc) => ({...doc.data(), id: doc.id}));
        userResult = userResult.filter(user => user.id !== userInfo.userID);

        const followingCollection = collection(db, "users", userInfo.userID, "following");
        const followingData = await getDocs(followingCollection)
        let followingResult = followingData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let suggestionList = [];

        for(let i = 0; i < userResult.length; i++) {
            let matched = false;
            for(let j = 0; j < followingResult.length; j++) {
                if(userResult[i].id === followingResult[j].userID) matched = true;
            }
            if(!matched) suggestionList.push(userResult[i]);
        }
        setUserSuggestions(suggestionList);
    }

    const getFollowingPosts = async() => {
        const followingCollection = collection(db, "users", userInfo.userID, "following");
        const followingData = await getDocs(followingCollection);
        const followingResult = followingData.docs.map((doc) => ({...doc.data(), id: doc.id}));
        console.log(followingResult);

        let posts = [];

        for(let i = 0; i <= followingResult.length - 1; i++) {
            const userInfoCollection = doc(db, "users", followingResult[i].userID);
            const userInfoData = await getDoc(userInfoCollection);
            const userInfoResult = userInfoData.data();

            const postsCollection = collection(db, "users", followingResult[i].userID, "posts");
            const postsData = await getDocs(postsCollection);
            let postsResult = postsData.docs.map((doc) => ({...doc.data(), id: doc.id}));

             postsResult = postsResult.map(post => ({
                data: post,
                avatar: userInfoResult.avatar,
                username: userInfoResult.username,
            }));

            postsResult.map(post => posts.push(post));
        }
        posts.sort(function (a, b) {
            if(a.data.timestamp.seconds < b.data.timestamp.seconds) return 1;
            else return -1;
        });
        setFollowingPosts(posts);
    }

    return (
        <div className="homePage">
            <div className="homePageContainer">
                <div className="homePagePosts">
                    {followingPosts?.map(post => (
                        <HomePagePost key={post.data.id} image={post.data.image} text={post.data.text}
                                      username={post.username} avatar={post.avatar} publisherID={post.data.publisherID}
                                      showPostModal={showPostModal} timestamp={post.data.timestamp} postID={post.data.id}
                        />
                    ))}
                </div>
                <div className="homePageSuggestionsContainer">
                    <div className="suggestionsAvatar">
                            <img onClick={() => navigate("/profile/" + userInfo.userID)} alt={userInfo?.username} src={userInfo?.avatar} />
                            <p onClick={() => navigate("/profile/" + userInfo.userID)}>{userInfo?.username}</p>
                    </div>
                    <div className="suggestions">
                        <div className="suggestionsHeader">
                            <p>Suggestions for you</p>
                        </div>
                        {userSuggestions?.map(user => (
                            <Suggestion key={user.id} username={user.username} userID={user.id} avatar={user.avatar}
                                        followUser={followUser}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePage;