import React from 'react';
import "./PostingModalContainer.css";
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../../utils/firebase";
import {v4} from "uuid";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import PostingModalHeader from "./PostingModalHeader";
import PostingModalUpload from "./PostingModalUpload";
import PostingModalDescription from "./PostingModalDescription";

function PostingModalContainer(props) {

    const navigate = useNavigate();

    const {hidePostingModal, userInfo, setShowPostingModal} = useContext(AppContext);

    const [imageInput, setImageInput] = useState("");
    const [textInput, setTextInput] = useState(null);

    const uploadImage = async(e) => {
        const imageRef = ref(storage, `images/${e.target.files[0].name + v4()}`);
        await uploadBytes(imageRef, e.target.files[0]);
        const url = await getDownloadURL(imageRef);
        setImageInput(url);
    }

    const createPost = async(e) => {
        e.preventDefault()
        const postsCollection = collection(db, "users", userInfo.userID, "posts");
        await addDoc(postsCollection, {
            text: textInput,
            image: imageInput,
            timestamp: serverTimestamp(),
            publisherID: userInfo.userID,
        });
        setImageInput("");
        setTextInput("");
        navigate("/profile/" + userInfo.userID);
        setShowPostingModal(false);

    }

    const handleOnClick = (e) => {
        hidePostingModal(e);
    }

    const visitProfilePage = (userID) => {
        setShowPostingModal(null);
        navigate("/profile/" + userID);
    }

    return (
        <div onClick={handleOnClick} className="postingModalContainer" id="postingModalContainer">
            <form onSubmit={createPost} className="postingModal">
                <PostingModalHeader />
                <div className="postingModalContent">
                    <PostingModalUpload  imageInput={imageInput} uploadImage={uploadImage}/>
                    <PostingModalDescription visitProfilePage={visitProfilePage} userInfo={userInfo} setTextInput={setTextInput}/>
                </div>
            </form>
        </div>
    );
}

export default PostingModalContainer;