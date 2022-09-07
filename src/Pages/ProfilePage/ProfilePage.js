import React, {useState, useEffect, useContext} from 'react';
import "./ProfilePage.css";
import {BsGrid3X3} from "react-icons/bs";
import {HiOutlineHeart} from "react-icons/hi";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import ProfilePagePost from "../../Components/ProfilePage/ProfilePagePost";


function ProfilePage(props) {

    const {userID} = useContext(AppContext);

    const [postsButton, setPostsButton] = useState(true);
    const [favoritesButton , setFavoritesButton] = useState(false);

    const [posts, setPosts] = useState([]);


   useEffect(() => {
       if(userID === null) return
        getPosts();
        console.log("hey");
    }, [userID]);

    const getPosts = async () => {
        const postsCollection = collection(db, "users", userID, "posts");
        const data = await getDocs(postsCollection);
        setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

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
                    <button style={{borderTop: postsButton && "1px solid black", color: postsButton && "#262626"}}
                            type="button"><BsGrid3X3 id="gridIcon" /> Posts</button>
                    <button style={{borderTop: favoritesButton && "1px solid black", color: favoritesButton && "#262626"}}
                            type="button"><HiOutlineHeart id="gridIcon" /> Favorites</button>
                </div>
                <div className="profilePagePosts">
                    {posts.map(post => (
                        <ProfilePagePost key={post.id} image={post.image} text={post.text} timestamp={post.timestamp} postID={post.id} />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ProfilePage;