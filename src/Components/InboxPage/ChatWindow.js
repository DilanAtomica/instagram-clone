import React from 'react';
import "./ChatWindow.css";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";
import Message from "./Message";

function ChatWindow({visitProfilePage, currentChat, inputMessage, userInfo, setInputMessage, sendMessage}) {

    const handleOnSubmit = (e) => {
        sendMessage(e);
    }

    return (
        <section className="chatWindow">
            <header className="chatWindowHeader">
                <Avatar action={visitProfilePage} userID={currentChat?.userID} image={currentChat?.avatar}
                        altText={currentChat?.username} size="1.5rem" margin="0 0.5rem 0 2rem" />
                <Username visitProfilePage={visitProfilePage} username={currentChat?.username}
                          userID={currentChat?.userID} fontSize={14} />
            </header>
            <div className="chatWindowFooter">
                <ul className="chatWindowMessages">
                    {currentChat?.messages?.map(message => (
                        <Message key={message?.id} text={message?.text} sentByUserID={message?.sentByUserID} userID={userInfo?.userID} />
                    ))}
                </ul>
                <form onSubmit={handleOnSubmit}>
                    <input value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
                           type="text" placeholder="Send a message..."/>
                </form>
            </div>
        </section>
    );
}

export default ChatWindow;