import React, {useEffect, useState, useContext} from 'react';
import "./InboxPage.css";
import {HiOutlinePencilAlt} from "react-icons/hi";
import MessageModalContainer from "../../Components/InboxPage/MessageModalContainer";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import ChatUser from "../../Components/InboxPage/ChatUser";

function InboxPage(props) {

    const {userInfo} = useContext(AppContext);

    const [userSuggestions, setUserSuggestions] = useState(null);
    const [chatUsers, setChatUsers] = useState([]);

    const [showMessageModal, setShowMessageModal] = useState(false);

    useEffect(() => {
        if(userInfo === null) return;
        getChatUsers();
        getUserSuggestions();
        console.log("NOO");

    }, [userInfo]);

    const getUserSuggestions = async() => {
        const usersCollection = collection(db, "users");
        const usersData = await getDocs(usersCollection);
        const usersResult = usersData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let users = [];

        for(let i = 0; i < usersResult.length; i++) {
            if(usersResult.id !== userInfo.userID) users.push(usersResult[i]);
        }
        setUserSuggestions(users);
    };

    const getChatUsers = async() => {
        const chatUsersCollection = collection(db, "users", userInfo.userID, "chats");
        const chatUsersData = await getDocs(chatUsersCollection);
        const chatUsersResult = chatUsersData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let users = [];
        for(let i = 0; i < chatUsersResult.length; i++) {
            const chatUserDoc = doc(db, "users", chatUsersResult[i].participantID);
            const chatUserData = await getDoc(chatUserDoc);
            let chatUserResult = chatUserData.data();
            chatUserResult = {...chatUserResult, userID: chatUsersResult[i].participantID};
            users.push(chatUserResult);
        }

        setChatUsers(users);
    }

    const hideMessageModal = () => {
        setShowMessageModal(false);
    };

    return (
        <div className="inboxPage">
            <div className="inboxContainer">
                <div className="inboxLeft">
                    <div className="inboxLeft-top">
                        <h1>Dilan</h1>
                        <HiOutlinePencilAlt onClick={() => setShowMessageModal(true)} id="pencilIcon"/>
                    </div>
                    <div className="inboxLeft-bottom">
                        {chatUsers?.map(user => (
                            <ChatUser key={user.userID} userID={user.userID} username={user.username} avatar={user.avatar} />
                        ))}
                    </div>
                </div>
                <div className="inboxRight">
                    <div className="inboxRight-top">
                        <img src="https://www.vectornator.io/blog/content/images/2022/03/62024ea00c20c3ee4ef61310_Studio-Ghibli-Thumbnail.png" />
                        <h2>Dilan</h2>
                    </div>
                    <div className="inboxRight-bottom">
                        <div className="inboxRight-messageBox">
                            <div className="inboxRight-message">
                                <p>My guy, can you give me the inside scoop on Yozora? I promise i won't tell anyone. And just to prove to you that i'll keep my mouth shut, i'll have you know i've finished KH2 on critical mode. Yeh, you heard right. Anyways, godspeed.</p>
                            </div>
                        </div>
                        <form>
                            <input type="text" placeholder="Send a message..."/>
                        </form>
                    </div>
                </div>
            </div>
            {showMessageModal && <MessageModalContainer userSuggestions={userSuggestions} hideMessageModal={hideMessageModal} />}

        </div>
    );
}

export default InboxPage;