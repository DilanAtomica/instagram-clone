import React, {useContext, useState} from 'react';
import "./NavBar.css";
import Logo from "../../Images/logo.png";
import {FiSearch, FiSend, FiSettings} from "react-icons/fi";
import {TiDelete} from "react-icons/ti";
import {AiOutlineCamera, AiOutlineHome} from "react-icons/ai";
import {MdOutlineExplore} from "react-icons/md";
import {BiUserCircle} from "react-icons/bi";
import {AppContext} from "../../App";
import {signOut} from "firebase/auth";
import {auth} from "../../utils/firebase";
import {useNavigate} from "react-router-dom";
import Avatar from "../Avatar/Avatar";

function NavBar(props) {

    const [inputFocused, setInputFocused] = useState(false);
    const [isAvatarClicked, setIsAvatarClicked] = useState(false);
    const [searchInput, setSearchInput] = useState("");

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

    const navigateSettings = () => {
        setIsAvatarClicked(false);
        navigate("/profile/" + userInfo?.userID + "/settings");
    }

    const logout = async() => {
        await signOut(auth);
        setUser(null);
        navigate("/");
    };

    const handleOnSubmit = () => {
        navigate("/result/" + searchInput);
    }

    return (
        <header className="navBar">
            <nav>
                <img onClick={() => navigate("/home")} alt="logo" src={Logo} />
                <form onSubmit={handleOnSubmit} style={{paddingRight: inputFocused && "1.8rem"}} className="searchField">
                    <input onChange={(e) => setSearchInput(e.target.value)}
                           value={searchInput} style={{paddingLeft: inputFocused && "1rem", paddingRight: inputFocused && "1rem"}}
                           onBlur={() => setInputFocused(false)}
                           onFocus={() => setInputFocused(true)} type="text" placeholder="Search" />
                    {!inputFocused && <FiSearch id="searchIcon" />}
                    {inputFocused && <TiDelete id="searchExitIcon"
                     onClick={(e) => e.currentTarget.previousElementSibling.previousElementSibling.blur()}/>}
                </form>
                <ul className="navigationLinks">
                    <li onClick={() => navigate("/home")}><AiOutlineHome /></li>
                    <li onClick={() => navigate("/inbox")}><FiSend /></li>
                    <li onClick={() => navigate("/explore")}><MdOutlineExplore /></li>
                    <li onClick={() => setShowPostingModal(true)}><AiOutlineCamera /></li>
                    <li>
                        <Avatar showSettings={handleAvatarClick} image={userInfo?.avatar} altText={userInfo?.username} size="2rem" />
                        {isAvatarClicked && <div style={{opacity: isAvatarClicked && "1"}} className="avatarDropDownArrow"></div>}
                        {isAvatarClicked && <ul style={{opacity: isAvatarClicked && "1"}} className="avatarDropDownBox">
                            <li onClick={navigateProfile}><BiUserCircle className="avatarDropDownIcon" /> Profile</li>
                            <li onClick={navigateSettings}><FiSettings className="avatarDropDownIcon" /> Settings</li>
                            <li onClick={logout}>Log out</li>
                        </ul>}
                    </li>
                </ul>

            </nav>
        </header>
    );
}

export default NavBar;