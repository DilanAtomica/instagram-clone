import React, {useContext, useEffect, useState} from 'react';
import "./NavBar.css";
import Logo from "../../Images/logo.png";
import {FiSearch} from "react-icons/fi";
import {TiDelete} from "react-icons/ti";
import {AiFillHome, AiOutlineHome, AiFillCamera, AiOutlineCamera} from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {FiSend} from "react-icons/fi";
import {BiUserCircle} from "react-icons/bi";
import {FiSettings} from "react-icons/fi";
import {HiHeart, HiOutlineHeart} from "react-icons/hi";
import {AppContext} from "../../App";
import {signOut} from "firebase/auth";
import {auth} from "../../utils/firebase";
import {useNavigate} from "react-router-dom";

function NavBar(props) {

    const [inputFocused, setInputFocused] = useState(false);
    const [isAvatarClicked, setIsAvatarClicked] = useState(false);

    const {setUser, setShowPostingModal, userInfo} = useContext(AppContext);
    const navigate = useNavigate();

    const handleAvatarClick = (e) => {
        setIsAvatarClicked(true);
        document.addEventListener("mousedown", (unClickAvatar));
        function unClickAvatar(e) {
            if(e.target.parentElement.className !== "avatarDropDownBox") {
                setIsAvatarClicked(false);
                document.removeEventListener("mousedown", (unClickAvatar));
            }
        }
    }

    const navigateProfile = () => {
        setIsAvatarClicked(false);
        navigate("/profile/" + userInfo?.userID);
    }

    const logout = async() => {
        await signOut(auth);
        setUser(null);
        navigate("/");
    }

    return (
        <header className="navBar">
            <nav>
                <img alt="logo" src={Logo} />
                <div style={{paddingRight: inputFocused && "1.8rem"}} className="searchField">
                    <input style={{paddingLeft: inputFocused && "1rem", paddingRight: inputFocused && "1rem"}}
                           onBlur={() => setInputFocused(false)}
                           onFocus={() => setInputFocused(true)} type="text" placeholder="Search" />
                    {!inputFocused && <FiSearch id="searchIcon" />}
                    {inputFocused && <TiDelete id="searchExitIcon"
                     onClick={(e) => e.currentTarget.previousElementSibling.previousElementSibling.blur()} />}
                </div>
                <ul className="navigationLinks">
                    <li onClick={() => navigate("/home")}><AiOutlineHome /></li>
                    <li><FiSend /></li>
                    <li><HiOutlineHeart /></li>
                    <li onClick={() => setShowPostingModal(true)}><AiOutlineCamera /></li>
                    <li>
                        <FaUserCircle onClick={handleAvatarClick} />
                        {isAvatarClicked && <div style={{opacity: isAvatarClicked && "1"}} className="avatarDropDownArrow"></div>}
                        {isAvatarClicked && <ul style={{opacity: isAvatarClicked && "1"}} className="avatarDropDownBox">
                            <li onClick={navigateProfile}><BiUserCircle className="avatarDropDownIcon" /> Profile</li>
                            <li><FiSettings className="avatarDropDownIcon" /> Settings</li>
                            <li onClick={logout}>Log out</li>
                        </ul>}
                    </li>
                </ul>

            </nav>
        </header>
    );
}

export default NavBar;