import React, {useContext, useEffect, useState} from 'react';
import "./HomePage.css";
import {AppContext} from "../../App";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {useNavigate} from "react-router-dom";
import HomePagePostsContainer from "../../Components/HomePage/HomePagePostsContainer";
import HomePageSuggestionsContainer from "../../Components/HomePage/HomePageSuggestionsContainer";

function HomePage(props) {

    const navigate = useNavigate();

    const {followUser, userInfo, showPostModal, likePost, commentPost, activateLoader, deActiveLoader} = useContext(AppContext);

    const [followingPosts, setFollowingPosts] = useState(null);
    const [userSuggestions, setUserSuggestions] = useState(null);

    useEffect(() => {
        if(userInfo === null) return;
        activateLoader();
        getFollowingPosts();
        getUserSuggestions();
        console.log("STOPP");
    }, [userInfo]);

    const getUserSuggestions = async() => {
        try {
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
        } catch {
            navigate("/error");
        }

    }

    const getFollowingPosts = async() => {
        try {
            const followingCollection = collection(db, "users", userInfo.userID, "following");
            const followingData = await getDocs(followingCollection);
            const followingResult = followingData.docs.map((doc) => ({...doc.data(), id: doc.id}));

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

                for(let j = 0; j < postsResult.length; j++) {
                    const likesCollection = collection(db, "users", followingResult[i].userID, "posts", postsResult[j].data.id, "likes");
                    const likesData = await getDocs(likesCollection);
                    let likesResult = likesData.docs.map((doc) => ({...doc.data(), id: doc.id}));
                    postsResult[j] = {...postsResult[j], likes: likesResult.length};

                    let userData = null;
                    if(likesResult[0]) {
                        const docRefUser = doc(db, "users", likesResult[0].userID);
                        const userDocData = await getDoc(docRefUser);
                        userData = userDocData.data();
                        userData = {...userData, userID: likesResult[0].userID};
                    }

                    let isLiked = false;
                    likesResult.forEach(like => {
                        if(like.userID === userInfo.userID) {
                            isLiked = true;
                        }
                    });

                    postsResult[j] = {...postsResult[j], likedByUser: isLiked, randomUserLikeName: userData?.username,
                        randomUserLikeAvatar: userData?.avatar, randomUserID: userData?.userID,
                    };
                }

                postsResult.map(post => posts.push(post));
            }
            posts.sort(function (a, b) {
                if(a.data.timestamp.seconds < b.data.timestamp.seconds) return 1;
                else return -1;
            });
            setFollowingPosts(posts);
            deActiveLoader();

        } catch {
            deActiveLoader();
            navigate("/error");
        }
    };

    const visitProfilePage = (userID) => {
        navigate("/profile/" + userID);
    }

    return (
        <main className="homePage">
            <div className="homePageContainer">
                 <HomePagePostsContainer followingPosts={followingPosts} visitProfilePage={visitProfilePage} showPostModal={showPostModal}
                                            likePost={likePost} commentPost={commentPost}/>

                <HomePageSuggestionsContainer followUser={followUser} userSuggestions={userSuggestions} userInfo={userInfo}
                                              visitProfilePage={visitProfilePage} />
            </div>
        </main>
    );
}

export default HomePage;