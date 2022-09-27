import React from 'react';
import "./PostingModalContainer.css";
import {TiDeleteOutline} from "react-icons/ti";
import {BiUserCircle} from "react-icons/bi";
import {useContext, useState} from "react";
import {AppContext} from "../../App";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../../utils/firebase";
import {v4} from "uuid";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Button from "../Buttons/Button";
import Avatar from "../Avatar/Avatar";
import Username from "../Username/Username";

function PostingModalContainer(props) {

    const navigate = useNavigate();

    const {hidePostingModal, userInfo, setShowPostingModal} = useContext(AppContext);

    const [imageInput, setImageInput] = useState("");
    const [textInput, setTextInput] = useState(null);

    const handleImageChange = async(e) => {
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
                <div className="postingModalHeader">
                    <h2>Create a new post</h2>
                    <Button type="submit" text="Share" fontSize="14" padding="0.75rem 0.5rem 0.5rem" />
                </div>
                <div className="postingModalContent">
                    <div className="postingModalContent-left">
                        {imageInput.length > 1 ? <img alt="Upload image" src={imageInput} /> :
                            <label id="imageInputLabel" htmlFor="imageInput">
                                Upload image
                                <input id="imageInput" onChange={handleImageChange} className="profile-imageInput" type="file" />
                            </label>
                        }

                    </div>
                    <div className="postingModalContent-right">
                        <div className="postingModalProfile">
                            <Avatar action={visitProfilePage} userID={userInfo?.userID} image={userInfo?.avatar}
                                    altText={userInfo?.username} size="1.5rem" margin="0 0.5rem 0.5rem 0" />
                            <Username visitProfilePage={visitProfilePage} username={userInfo?.username}
                                      userID={userInfo?.userID} fontSize={16} margin="0 0 0.5rem 0"/>
                        </div>
                        <textarea onChange={(e) => setTextInput(e.target.value)}
                                  rows="10" placeholder="Write a subtitle..." />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default PostingModalContainer;