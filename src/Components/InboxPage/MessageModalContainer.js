import React, {useState, useContext} from 'react';
import "./MessageModalContainer.css";
import MessageModalSuggestion from "./MessageModalSuggestion";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import Button from "../Buttons/Button";

function MessageModalContainer({userSuggestions, hideMessageModal}) {

    const {userInfo} = useContext(AppContext);

    const [chosenUser, setChosenUser] = useState();

    const chooseUser = (userID) => {
        setChosenUser(userID);
    }

    const handleOnClick = (e) => {
        if(e.target.id === "messageModalContainer") hideMessageModal();
    }

    const createChat = async() => {
        const userChatCollection = collection(db, "users", userInfo.userID, "chats");
        await addDoc(userChatCollection, {
            participantID: chosenUser,
        });

        const participantChatCollection = collection(db, "users", chosenUser, "chats");
        await addDoc(participantChatCollection, {
            participantID: userInfo.userID,
        });

        hideMessageModal();
    }


    return (
        <div onClick={handleOnClick} className="messageModalContainer" id="messageModalContainer">
            <div className="messageModal">
                <div className="messageModalTop">
                    <h1>New Message</h1>
                    <Button onClick={createChat} type="button" text="Next" fontSize="14" margin="0 1.5rem 0 0" />
                </div>
                <div className="messageModalSuggestions">
                    <h2>Suggestions</h2>
                    {userSuggestions?.map(user => (
                        <MessageModalSuggestion key={user?.id} username={user?.username} userID={user?.id} avatar={user?.avatar}
                                                chooseUser={chooseUser} chosenUser={chosenUser}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MessageModalContainer;