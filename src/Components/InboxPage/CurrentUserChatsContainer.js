import React from 'react';
import "./CurrentUserChatsContainer.css";
import Username from "../Username/Username";
import {HiOutlinePencilAlt} from "react-icons/hi";
import ChatUser from "./ChatUser";

function CurrentUserChatsContainer({visitProfilePage, currentChat, userInfo, setShowMessageModal, chatUsers, showChosenChat}) {
    return (
        <section className="currentUserChatsContainer">
            <header className="currentUserChatsHeader">
                <Username visitProfilePage={visitProfilePage} username={userInfo?.username}
                          userID={currentChat?.userID} fontSize={18} margin="0 7rem 0 0" />
                <HiOutlinePencilAlt onClick={() => setShowMessageModal(true)} id="pencilIcon"/>
            </header>
            <ul className="currentUserChats">
                {chatUsers?.map(user => (
                    <ChatUser key={user.userID} userID={user.userID} username={user.username} avatar={user.avatar}
                              showChosenChat={showChosenChat}
                    />
                ))}
            </ul>
        </section>
    );
}

export default CurrentUserChatsContainer;