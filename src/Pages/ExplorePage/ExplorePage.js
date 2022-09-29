import React, {useContext, useEffect, useState} from 'react';
import "./ExplorePage.css";
import ProfilePagePost from "../../Components/ProfilePage/ProfilePagePost";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";

function ExplorePage(props) {

    const navigate = useNavigate();

    const {userInfo, activateLoader, deActiveLoader} = useContext(AppContext);

    const [explorePosts, setExplorePosts] = useState(null);

    useEffect(() => {
        if(userInfo === null) return;
        activateLoader();
        getExplorePosts(userInfo.userID);
        console.log("SPAM");
    }, [userInfo]);

    const getExplorePosts = async(userID) => {
        try {
            const usersCollection = collection(db, "users");
            const usersData = await getDocs(usersCollection);
            const usersResult = usersData.docs.map((doc) => ({...doc.data(), id: doc.id}));
            let posts = [];

            for(let i = 0; i < usersResult.length; i++) {
                if(usersResult[i].id !== userID) {
                    const postsCollection = collection(db, "users", usersResult[i].id, "posts");
                    const postsData = await getDocs(postsCollection);
                    const postsResult = postsData.docs.map((doc) => ({...doc.data(), id: doc.id}));

                    for(let j = 0; j < postsResult.length; j++) {
                        posts.push(postsResult[j]);
                    }
                }
            }
            setExplorePosts(posts);
            deActiveLoader();
        } catch {
            deActiveLoader();
            navigate("/error");
        }


    }

    return (
        <main className="explorePage">
            <section>
            <ul className="explorePagePostsContainer">
                    {explorePosts?.map(post => (
                        <ProfilePagePost key={post.id} image={post.image} text={post.text} timestamp={post.timestamp} postID={post.id}
                                         publisherID={post.publisherID}/>
                    ))}
            </ul>
            </section>
        </main>
    );
}

export default ExplorePage;