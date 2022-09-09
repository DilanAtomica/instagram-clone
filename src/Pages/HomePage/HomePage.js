import React, {useContext, useEffect, useState} from 'react';
import "./HomePage.css";
import {BiUserCircle} from "react-icons/bi";
import {AppContext} from "../../App";
import HomePagePost from "../../Components/HomePage/HomePagePost";
import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/firebase";

function HomePage(props) {

    const {userSuggestions, followUser, userInfo} = useContext(AppContext);

    const [followingPosts, setFollowingPosts] = useState(null);

    useEffect(() => {
        if(userInfo === null) return;
        getFollowingPosts();
        console.log("STOPP");
    }, [userInfo]);

    const getFollowingPosts = async() => {
        const followingCollection = collection(db, "users", userInfo.userID, "following");
        const followingData = await getDocs(followingCollection);
        const followingResult = followingData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let posts = [];

        for(let i = 0; i < followingResult.length; i++) {
            console.log(followingResult[i].userID);

            const userInfoCollection = doc(db, "users", followingResult[i].userID);
            const userInfoData = await getDoc(userInfoCollection);
            const userInfoResult = userInfoData.data();

            const postsCollection = collection(db, "users", followingResult[i].userID, "posts");
            const postsData = await getDocs(postsCollection);
            let postsResult = postsData.docs.map((doc) => ({...doc.data(), id: doc.id}));

            posts.push({userAvatar: userInfoResult.avatar, username: userInfoResult.username, userPosts: postsResult});
            console.log(posts);
        }
        setFollowingPosts(posts[0].userPosts);
    }

    return (
        <div className="homePage">
            <div className="homePageContainer">
                <div className="homePagePosts">
                    {followingPosts?.map(post => (
                        <HomePagePost key={post.id} image={post.image} text={post.text} />
                    ))}
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