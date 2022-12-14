import React, {useContext, useState} from 'react';
import "./MessageModalContainer.css";
import MessageModalSuggestion from "./MessageModalSuggestion";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../../utils/firebase";
import {AppContext} from "../../App";
import Button from "../Buttons/Button";
import {useNavigate} from "react-router-dom";

function MessageModalContainer({userSuggestions, hideMessageModal}) {

    const navigate = useNavigate();

    const {userInfo} = useContext(AppContext);

    const [chosenUser, setChosenUser] = useState();

    const chooseUser = (userID) => {
        setChosenUser(userID);
    }

    const handleOnClick = (e) => {
        if(e.target.id === "messageModalContainer") hideMessageModal();
    }

    const createChat = async() => {
        try {
            const userChatCollection = collection(db, "users", userInfo.userID, "chats");
            await addDoc(userChatCollection, {
                participantID: chosenUser,
            });

            const participantChatCollection = collection(db, "users", chosenUser, "chats");
            await addDoc(participantChatCollection, {
                participantID: userInfo.userID,
            });

            hideMessageModal();
        } catch {
            navigate("/error");
        }

    }


    return (
        <section onClick={handleOnClick} className="messageModalContainer" id="messageModalContainer">
            <div className="messageModal">
                <header className="messageModalTop">
                    <h1>New Message</h1>
                    <Button action={createChat} type="button" text="Next" fontSize="14" margin="0 1.5rem 0 0" />
                </header>
                <ul className="messageModalSuggestions">
                    <h2>Suggestions</h2>
                    {userSuggestions?.map(user => (
                        <MessageModalSuggestion key={user?.id} username={user?.username} userID={user?.id} avatar={user?.avatar}
                                                chooseUser={chooseUser} chosenUser={chosenUser}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default MessageModalContainer;