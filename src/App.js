import './App.css';
import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import {collection, getDocs} from "firebase/firestore";
import {db, auth} from "./utils/firebase";
import NavBar from "./Components/NavBar/NavBar";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PostingModalContainer from "./Components/PostingModalContainer/PostingModalContainer";
import PostModalContainer from "./Components/PostModalContainer/PostModalContainer";

export const AppContext = createContext();

function App() {

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [userID, setUserID] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);

    const [showPostingModal, setShowPostingModal] = useState(false);

    const [postModal, setPostModal] = useState(null);

    const showPostModal = (image, text, timestamp, postID) => {
        setPostModal({
            image: image,
            text: text,
            timestamp: timestamp,
            postID: postID
        })
    }

    const hidePostModal = (e) => {
        if(e.target.id === "postModalContainer") setPostModal(null);
    }

    const usersCollection = collection(db, "users")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( (authUser) => {
            if(authUser) {
                setUser(authUser);
                const getUser = async () => {
                    const data = await getDocs(usersCollection);
                    const result = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
                    result.forEach(account => {
                        if(account.email === authUser.email) {
                            setUsername(account.username);
                            setUserID(account.id);
                            setUserAvatar(account.imageUrl);
                        }
                    })

                };
                getUser();
            } else {
                setUser(null);
            }
        }, );

        return () => {
            unsubscribe();
        }
    }, []);

    const hidePostingModal = (e) => {
        if(e.target.id === "postingModalContainer") setShowPostingModal(false);
        if(e.target.id === "exitPostModalIcon") setShowPostingModal(false);
    }


    return (
      <AppContext.Provider value={{user, setUser, username, setUsername, userID,
          userAvatar, setUserAvatar, showPostingModal, setShowPostingModal, hidePostingModal, showPostModal, hidePostModal, postModal}}>
        <div className="App">
            {postModal && <PostModalContainer image={postModal.image} text={postModal.text} timestamp={postModal.timestamp} postID={postModal.postID} />}
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
