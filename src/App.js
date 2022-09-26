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
import ExplorePage from "./Pages/ExplorePage/ExplorePage";
import InboxPage from "./Pages/InboxPage/InboxPage";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";

export const AppContext = createContext();

function App() {

    const [user, setUser] = useState(null);

    const [userInfo, setUserInfo] = useState(null);

    const [showPostingModal, setShowPostingModal] = useState(false);

    const [postModal, setPostModal] = useState(null);

    const [loading, setLoading] = useState(false);

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
                });

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
                    alreadyFollowing: await isFollowing(publisherID),
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
    };

    const unFollowUser = async(followingUserID) => {
        const followedUserDoc = collection(db, "users", userInfo.userID, "following");
        const followedUserData = await getDocs(followedUserDoc);
        const followedUserResult = followedUserData.docs.map((doc) => ({...doc.data(), id: doc.id}));
        let docID = "";
        for(let i = 0; i < followedUserResult.length; i++) {
            if(followedUserResult[i].userID === followingUserID) docID = followedUserResult[i].id;
        }
        await deleteDoc(doc(db, "users", userInfo.userID, "following", docID));
    };

    const isFollowing = async(userID) => {
        if(userID === userInfo.userID) return;
        const followingCountCollection = collection(db, "users", userInfo.userID, "following");
        const followingData = await getDocs(followingCountCollection);
        const followingResult = followingData.docs.map((doc) => ({...doc.data(), id: doc.id}));
        let alreadyFollowing = false;

        for(let i = 0; i < followingResult.length; i++) {
            if(followingResult[i].userID === userID) alreadyFollowing = true;
        }
        return alreadyFollowing;
    };



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

        let favoritedDocID = "";
        const favoritedCollection = collection(db, "users", userInfo.userID, "favorited");
        const favoritedData = await getDocs(favoritedCollection);
        const favoritedResult = favoritedData.docs.map((doc) => ({...doc.data(), id: doc.id}));
        favoritedResult.forEach(favorite => {
           if(favorite.postID === postID) {
               favoritedDocID = favorite.id;
           }
        });

        if(alreadyLiked) {
            await deleteDoc(doc(db, "users", publisherID, "posts", postID, "likes", docID));
            await deleteDoc(doc(db, "users", userInfo.userID, "favorited", favoritedDocID));
        } else {
            await addDoc(likesCollection, {
                userID: userInfo.userID,
            });
            await addDoc(favoritedCollection, {
                publisherID: publisherID,
                postID: postID,
                timestamp: serverTimestamp(),
            });
        }
    };

    const getDaysSince = (timestamp) => {
        if(timestamp) {
            const currentDateSeconds = new Date().getTime();
            const datePostedSeconds = timestamp?.seconds*1000;
            const daysSince = (currentDateSeconds - datePostedSeconds) / 1000 / 60 / 60 / 24;

            if(daysSince < 1) return "Today"
            if(daysSince > 1 && daysSince < 2) return Math.floor(daysSince) + " day ago";
            else return Math.floor(daysSince) + " days ago";
        } else {
            return "Today";
        }
    };

    const activateLoader = () => {
        setLoading(true);
    };

    const deActiveLoader = () => {
        setLoading(false);
    };

    return (
      <AppContext.Provider value={{user, setUser, userInfo, followUser, unFollowUser, isFollowing, showPostingModal, setShowPostingModal,
          hidePostingModal, showPostModal, hidePostModal, postModal, likePost, commentPost, setPostModal, getDaysSince, activateLoader,
          deActiveLoader, loading
      }}>
        <div className="App">
            <LoadingSpinner isLoading={loading} />
            <BrowserRouter>
                {postModal &&
                    <PostModalContainer image={postModal.image} text={postModal.text} timestamp={postModal.timestamp}
                                        postID={postModal.postID} publisherID={postModal.publisherID} publisherName={postModal.publisherName}
                                        publisherAvatar={postModal.publisherAvatar} comments={postModal.comments} commentPost={commentPost}
                                        replyToComment={replyToComment} likes={postModal.likes} likedByUser={postModal.likedByUser}
                                        alreadyFollowing={postModal.alreadyFollowing}

                    />}
                {showPostingModal && <PostingModalContainer />}
            <Routes>
              <Route path="/" element={<> <LoginPage /> </>} />
              <Route path="/register" element={<> <RegisterPage /> </>} />
              <Route path="/home" element={<> <NavBar /> <HomePage /> </>} />
              <Route path="/profile/:userID" element={<> <NavBar /> <ProfilePage /> </>} />
              <Route path="/profile/:userID/settings" element={<> <NavBar /> <SettingsPage /> </>} />
              <Route path="/explore" element={<> <NavBar /> <ExplorePage /> </>} />
              <Route path="/inbox" element={<> <NavBar /> <InboxPage /> </>} />

            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
  );
}

export default App;
