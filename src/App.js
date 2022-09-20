import './App.css';
import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import {addDoc, collection, updateDoc, getDocs, serverTimestamp, doc, getDoc, deleteDoc} from "firebase/firestore";
import {db, auth} from "./utils/firebase";
import NavBar from "./Components/NavBar/NavBar";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PostingModalContainer from "./Components/PostingModalContainer/PostingModalContainer";
import PostModalContainer from "./Components/PostModalContainer/PostModalContainer";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";

export const AppContext = createContext();

function App() {

    const [user, setUser] = useState(null);

    const [userInfo, setUserInfo] = useState(null);

    const [showPostingModal, setShowPostingModal] = useState(false);

    const [postModal, setPostModal] = useState(null);

    const usersCollection = collection(db, "users");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( (authUser) => {
            if(authUser) {
                setUser(authUser);
                getUser(authUser);

            } else {
                setUser(null);
            }
        },);

        return () => {
            unsubscribe();
        }
    }, []);

    const showPostModal = async(image, text, timestamp, postID, publisherID) => {
        const data = await getDocs(usersCollection);
        const result = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

        for(let i = 0; i < result.length; i++) {
            if(result[i].id === publisherID) {

                const commentsCollection = collection(db, "users", publisherID, "posts", postID, "comments");
                const commentsData = await getDocs(commentsCollection);
                const commentsResults = commentsData.docs.map((doc) => ({...doc.data(), id: doc.id}));

                const likesCollection = collection(db, "users", publisherID, "posts", postID, "likes");
                const likesData = await getDocs(likesCollection);
                const likesResults = likesData.docs.map((doc) => ({...doc.data(), id: doc.id}));
                let likedByUser = false;
                likesResults.forEach(user => {
                    if(user.userID === userInfo.userID) likedByUser = true;
                })

                setPostModal({
                    image: image,
                    text: text,
                    timestamp: timestamp,
                    postID: postID,
                    publisherID: publisherID,
                    publisherName:  result[i].username,
                    publisherAvatar: result[i].avatar,
                    comments: commentsResults,
                    likes: likesResults.length,
                    likedByUser: likedByUser,
                });
            }
        }


    }

    const hidePostModal = (e) => {
        if(e.target.id === "postModalContainer") setPostModal(null);
    }

    const followUser = async(userID) => {
        const followedUsers = collection(db, "users", userInfo.userID, "following");
        await addDoc(followedUsers, {userID});

        const userDoc = await doc(db, "users", userID);
        const userData = await getDoc(userDoc);
        const userResult = userData.data();
        await updateDoc(userDoc, {followerCount: userResult.followerCount + 1});

    }

    const commentPost = async(publisherID, postID, comment) => {
        const commentCollection = collection(db, "users", publisherID, "posts", postID, "comments");
        await addDoc(commentCollection, {
            commenterName: userInfo.username,
            commenterID: userInfo.userID,
            commenterAvatar: userInfo.avatar,
            comment: comment,
            timestamp: serverTimestamp(),
        });
    }

    const replyToComment = async(publisherID, postID, commentID, reply) => {
        const repliesCollection = collection(db, "users", publisherID, "posts", postID, "comments", commentID, "replies");
        await addDoc(repliesCollection, {
            replierName: userInfo.username,
            replierID: userInfo.userID,
            replierAvatar: userInfo.avatar,
            reply: reply,
            timestamp: serverTimestamp(),
        });
    };

    const getUser = async (authUser) => {
        const data = await getDocs(usersCollection);
        const result = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        result.forEach(account => {
            if(account.email === authUser.email) {
                setUserInfo({
                    username: account.username,
                    email: account.email,
                    userID: account.id,
                    avatar: account.avatar,
                    followerCount: account.followerCount,
                    description: account.description,
                });
            }
        });

    };

    const hidePostingModal = (e) => {
        if(e.target.id === "postingModalContainer") setShowPostingModal(false);
        if(e.target.id === "exitPostModalIcon") setShowPostingModal(false);
    };

    const likePost = async(publisherID, postID) => {
        let alreadyLiked = false;
        let docID = "";
        const likesCollection = collection(db, "users", publisherID, "posts", postID, "likes");
        const likesData = await getDocs(likesCollection);
        const likesResult = likesData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        likesResult.forEach(like => {
            if(like.userID === userInfo.userID) {
                alreadyLiked = true;
                docID = like.id;
            }
        });

        if(alreadyLiked) {
            await deleteDoc(doc(db, "users", publisherID, "posts", postID, "likes", docID));
        } else {
            await addDoc(likesCollection, {
                userID: userInfo.userID,
            });
        }
    };

    const getDaysSince = (timestamp) => {
        if(timestamp) {
            const currentDateSeconds = new Date().getTime();
            const datePostedSeconds = timestamp?.seconds*1000;
            const daysSince = (currentDateSeconds - datePostedSeconds) / 1000 / 60 / 60 / 24;

            if(daysSince < 1) return "Today"
            return Math.ceil(daysSince) + " days ago";
        } else {
            return "Today";
        }
    };

    return (
      <AppContext.Provider value={{user, setUser, userInfo, followUser,
          showPostingModal, setShowPostingModal, hidePostingModal, showPostModal, hidePostModal, postModal, likePost, commentPost, setPostModal,
          getDaysSince
      }}>
        <div className="App">
            <BrowserRouter>
                {postModal &&
                    <PostModalContainer image={postModal.image} text={postModal.text} timestamp={postModal.timestamp}
                                        postID={postModal.postID} publisherID={postModal.publisherID} publisherName={postModal.publisherName}
                                        publisherAvatar={postModal.publisherAvatar} comments={postModal.comments} commentPost={commentPost}
                                        replyToComment={replyToComment} likes={postModal.likes} likedByUser={postModal.likedByUser}

                    />}
                {showPostingModal && <PostingModalContainer />}
            <Routes>
              <Route path="/" element={<> <LoginPage /> </>} />
              <Route path="/register" element={<> <RegisterPage /> </>} />
              <Route path="/home" element={<> <NavBar /> <HomePage /> </>} />
              <Route path="/profile/:userID" element={<> <NavBar /> <ProfilePage /> </>} />
                <Route path="/profile/:userID/settings" element={<> <NavBar /> <SettingsPage /> </>} />

            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
  );
}

export default App;
