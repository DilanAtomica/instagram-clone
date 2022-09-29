import React, {useContext, useEffect, useState} from 'react';
import "./SettingsPage.css";
import {AppContext} from "../../App";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {db, storage} from "../../utils/firebase";
import {v4} from "uuid";
import Setting from "../../Components/SettingsPage/Setting";
import {doc, updateDoc} from "firebase/firestore";
import Avatar from "../../Components/Avatar/Avatar";
import Username from "../../Components/Username/Username";
import {useNavigate} from "react-router-dom";

function SettingsPage(props) {

    const {userInfo} = useContext(AppContext);

    const navigate = useNavigate();

    const [inputValues, setInputValues] = useState({
        inputAvatar: "",
        inputUsername: "",
        inputDescription: "",
        inputEmail: "",
    });

    useEffect(() => {
        if(userInfo === null) return;
        setInputValues({
            inputAvatar: userInfo?.avatar,
            inputUsername: userInfo?.username,
            inputDescription: userInfo?.description,
            inputEmail: userInfo?.email
        });
        console.log("STOP")
    }, [userInfo]);

    const handleAvatarChange = async(e) => {
        try {
            const imageRef = ref(storage, `images/${e.target.files[0].name + v4()}`);
            await uploadBytes(imageRef, e.target.files[0]);
            const url = await getDownloadURL(imageRef);
            setInputValues({...inputValues, inputAvatar: url});
        } catch {
            navigate("/error");
        }
    }

    const handleInputOnChange = (labelName, event) => {
        if(labelName === "Username") setInputValues({...inputValues, inputUsername: event.target.value});
        if(labelName === "Email") setInputValues({...inputValues, inputEmail: event.target.value});
        if(labelName === "Description") setInputValues({...inputValues, inputDescription: event.target.value});
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        try {
            const userDoc = await doc(db, "users", userInfo.userID);
            await updateDoc(userDoc, {username: inputValues.inputUsername, avatar: inputValues.inputAvatar,
                email: inputValues.inputEmail, description: inputValues.inputDescription});
            navigate("/profile/" + userInfo.userID);
            navigate(0);
        } catch {
            navigate("/error");
        }

    }

    return (
        <main className="settingsPage">
            <section>
            <form onSubmit={handleOnSubmit} className="settingsContainer">
                <div className="settingAvatar">
                    <div className="settingCurrentAvatar">
                        <Avatar altText={userInfo?.username} image={inputValues.inputAvatar || userInfo?.avatar} size="3rem"/>
                    </div>

                    <div className="settingInputAvatar">
                        <h1><Username fontSize={20} margin="0 0 0.25rem 0" username={userInfo?.username} userID={userInfo?.userID} /></h1>
                        <label id="avatarInputLabel" htmlFor="avatarInput">
                            Change avatar
                        <input onChange={handleAvatarChange} id="avatarInput" type="file" />
                        </label>
                    </div>
                </div>

                <Setting defaultValue={inputValues.inputUsername} labelName="Username" handleInputOnChange={handleInputOnChange}  />
                <Setting defaultValue={inputValues.inputEmail} labelName="Email" handleInputOnChange={handleInputOnChange} />
                <Setting defaultValue={inputValues.inputDescription} labelName="Description" handleInputOnChange={handleInputOnChange} />
                <button type="submit">Save Changes</button>
            </form>
            </section>
        </main>
    );
}

export default SettingsPage;