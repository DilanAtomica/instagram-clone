import React, {useEffect, useState, useContext} from 'react';
import "./InboxPage.css";
import {HiOutlinePencilAlt} from "react-icons/hi";
import MessageModalContainer from "../../Components/InboxPage/MessageModalContainer";
import {addDoc, collection, doc, getDoc, getDocs, serverTimestamp} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import ChatUser from "../../Components/InboxPage/ChatUser";
import Message from "../../Components/InboxPage/Message";
import Avatar from "../../Components/Avatar/Avatar";
import {useNavigate} from "react-router-dom";
import Username from "../../Components/Username/Username";
import CurrentUserChatsContainer from "../../Components/InboxPage/CurrentUserChatsContainer";
import ChatWindow from "../../Components/InboxPage/ChatWindow";

function InboxPage(props) {

    const {userInfo, activateLoader, deActiveLoader} = useContext(AppContext);

    const navigate = useNavigate();

    const [inputMessage, setInputMessage] = useState("");
    const [userSuggestions, setUserSuggestions] = useState(null);
    const [chatUsers, setChatUsers] = useState([]);

    const [showMessageModal, setShowMessageModal] = useState(false);

    const [currentChat, setCurrentChat] = useState({

    });

    useEffect(() => {
        if(userInfo === null) return;
        activateLoader();
        getChatUsers();
        getUserSuggestions();
        console.log("NOO");

    }, [userInfo, showMessageModal]);

    const getUserSuggestions = async() => {
        const usersCollection = collection(db, "users");
        const usersData = await getDocs(usersCollection);
        const usersResult = usersData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let users = [];
        for(let i = 0; i < usersResult.length; i++) {
            let isEligible = true;
            if(usersResult[i].id === userInfo.userID) isEligible = false;

            for(let j = 0; j < chatUsers.length; j++) {
                if(usersResult[i].id === chatUsers[j].userID) isEligible = false;
            }

            if(isEligible === true) users.push(usersResult[i]);
        }
        setUserSuggestions(users);
        deActiveLoader();
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

    const showChosenChat = async(userID, username, avatar) => {
        const chatsCollection = collection(db, "users", userInfo.userID, "chats");
        const chatsData = await getDocs(chatsCollection);
        const chatsResult = chatsData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let chatDocID = "";
        for(let i = 0; i < chatsResult.length; i++) {
            if(chatsResult[i].participantID === userID) chatDocID = chatsResult[i].id;
        }

        const messagesCollection = collection(db, "users", userInfo.userID, "chats", chatDocID, "messages");
        const messagesData = await getDocs(messagesCollection);
        let messagesResult = messagesData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        messagesResult = messagesResult.sort((a,b) => {
            return a.timestamp.seconds - b.timestamp.seconds;
        })

        setCurrentChat({messages: messagesResult, username: username, avatar: avatar, userID: userID, docID: chatDocID});
    };

    const sendMessage = async(e) => {
        e.preventDefault();
        const messagesCollection = collection(db, "users", userInfo.userID, "chats", currentChat.docID, "messages");
        await addDoc(messagesCollection, {
            text: inputMessage,
            sentByUserID: userInfo.userID,
            timestamp: serverTimestamp()
        });

        const chatsCollection = collection(db, "users", currentChat.userID, "chats");
        const chatsData = await getDocs(chatsCollection);
        const chatsResult = chatsData.docs.map((doc) => ({...doc.data(), id: doc.id}));

        let chatDocID = "";
        for(let i = 0; i < chatsResult.length; i++) {
            if(chatsResult[i].participantID === userInfo.userID) chatDocID = chatsResult[i].id;
        }
        const participantsMessagesCollection = collection(db, "users", currentChat.userID, "chats", chatDocID, "messages");
        await addDoc(participantsMessagesCollection, {
            text: inputMessage,
            sentByUserID: userInfo.userID,
            timestamp: serverTimestamp()
        });

        setInputMessage("");

        await showChosenChat(currentChat.userID, currentChat.username, currentChat.avatar);
    };

    const visitProfilePage = (userID) => {
        navigate("/profile/" + userID);
    }

    return (
        <div className="inboxPage">

            <div className="inboxContainer">
                <CurrentUserChatsContainer visitProfilePage={visitProfilePage} userInfo={userInfo} currentChat={currentChat}
                                           setShowMessageModal={setShowMessageModal} chatUsers={chatUsers} showChosenChat={showChosenChat}/>

                <ChatWindow visitProfilePage={visitProfilePage} currentChat={currentChat} userInfo={userInfo} inputMessage={inputMessage}
                            setInputMessage={setInputMessage} sendMessage={sendMessage}/>
            </div>

            {showMessageModal && <MessageModalContainer userSuggestions={userSuggestions} hideMessageModal={hideMessageModal}/>}
        </div>
    );
}

export default InboxPage;