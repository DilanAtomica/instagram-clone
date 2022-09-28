import React from 'react';
import "./CurrentUserChatsContainer.css";
import Username from "../Username/Username";
import {HiOutlinePencilAlt} from "react-icons/hi";
import ChatUser from "./ChatUser";

function CurrentUserChatsContainer({visitProfilePage, currentChat, userInfo, setShowMessageModal, chatUsers, showChosenChat}) {
    return (
        <div className="currentUserChatsContainer">
            <div className="currentUserChatsHeader">
                <Username visitProfilePage={visitProfilePage} username={userInfo?.username}
                          userID={currentChat?.userID} fontSize={18} margin="0 7rem 0 0" />
                <HiOutlinePencilAlt onClick={() => setShowMessageModal(true)} id="pencilIcon"/>
            </div>
            <div className="currentUserChats">
                {chatUsers?.map(user => (
                    <ChatUser key={user.userID} userID={user.userID} username={user.username} avatar={user.avatar}
                              showChosenChat={showChosenChat}
                    />
                ))}
            </div>
        </div>
    );
}

export default CurrentUserChatsContainer;