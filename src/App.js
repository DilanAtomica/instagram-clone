import './App.css';
import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import {addDoc, collection, getDocs, serverTimestamp} from "firebase/firestore";
import {db, auth} from "./utils/firebase";
import NavBar from "./Components/NavBar/NavBar";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PostingModalContainer from "./Components/PostingModalContainer/PostingModalContainer";
import PostModalContainer from "./Components/PostModalContainer/PostModalContainer";

export const AppContext = createContext();

function App() {

    const [user, setUser] = useState(null);

    const [userInfo, setUserInfo] = useState(null);

    const [userSuggestions, setUserSuggestions] = useState(null);

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
        }, );

        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if(!userInfo) return
        getUserSuggestions();
        console.log("STOP")

    }, [userInfo]);

    const showPostModal = async(image, text, timestamp, postID, publisherID) => {
        const data = await getDocs(usersCollection);
        const result = data.docs.map((doc) => ({...doc.data(), id: doc.id}));

        for(let i = 0; i < result.length; i++) {
            if(result[i].id === publisherID) {

                const commentsCollection = collection(db, "users", publisherID, "posts", postID, "comments");
                const commentsData = await getDocs(commentsCollection);
                const commentsResults = commentsData.docs.map((doc) => ({...doc.data(), id: doc.id}));

                setPostModal({
                    image: image,
                    text: text,
                    timestamp: timestamp,
                    postID: postID,
                    publisherID: publisherID,
                    publisherName:  result[i].username,
                    publisherAvatar: result[i].avatar,
                    comments: commentsResults,
                });
            }
        }


    }

    const hidePostModal = (e) => {
        if(e.target.id === "postModalContainer") setPostModal(null);
    }

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

    const followUser = async(userID) => {
        const followedUsers = collection(db, "users", userInfo.userID, "following");
        await addDoc(followedUsers, {userID});

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
                    userID: account.id,
                    avatar: account.avatar,
                });
            }
        });

    };

    const hidePostingModal = (e) => {
        if(e.target.id === "postingModalContainer") setShowPostingModal(false);
        if(e.target.id === "exitPostModalIcon") setShowPostingModal(false);
    }


    return (
      <AppContext.Provider value={{user, setUser, userInfo, userSuggestions, followUser,
          showPostingModal, setShowPostingModal, hidePostingModal, showPostModal, hidePostModal, postModal}}>
        <div className="App">
            {postModal &&
                <PostModalContainer image={postModal.image} text={postModal.text} timestamp={postModal.timestamp}
                                    postID={postModal.postID} publisherID={postModal.publisherID} publisherName={postModal.publisherName}
                                    publisherAvatar={postModal.publisherAvatar} comments={postModal.comments} commentPost={commentPost}
                                    replyToComment={replyToComment}

            />}
            {showPostingModal && <PostingModalContainer />}
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<> <LoginPage /> </>} />
              <Route path="/register" element={<> <RegisterPage /> </>} />
              <Route path="/home" element={<> <NavBar /> <HomePage /> </>} />
              <Route path="/profile" element={<> <NavBar /> <ProfilePage /> </>} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
  );
}

export default App;
