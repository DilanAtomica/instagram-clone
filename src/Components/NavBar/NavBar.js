import React, {useEffect, useState} from 'react';
import "./NavBar.css";
import Logo from "../../Images/logo.png";
import {FiSearch} from "react-icons/fi";
import {TiDelete} from "react-icons/ti";
import {AiFillHome, AiOutlineHome, AiFillCamera, AiOutlineCamera} from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {FiSend} from "react-icons/fi";
import {BiUserCircle} from "react-icons/bi";
import {FiSettings} from "react-icons/fi";
import {BsSuitHeart, BsSuitHeartFill} from "react-icons/bs";

function NavBar(props) {

    const [inputFocused, setInputFocused] = useState(false);
    const [isAvatarClicked, setIsAvatarClicked] = useState(false);

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
                    <li><AiOutlineHome /></li>
                    <li><FiSend /></li>
                    <li><BsSuitHeart /></li>
                    <li><AiOutlineCamera /></li>
                    <li>
                        <FaUserCircle onClick={handleAvatarClick} />
                        {isAvatarClicked && <div style={{opacity: isAvatarClicked && "1"}} className="avatarDropDownArrow"></div>}
                        {isAvatarClicked && <ul style={{opacity: isAvatarClicked && "1"}} className="avatarDropDownBox">
                            <li><BiUserCircle className="avatarDropDownIcon" /> Profile</li>
                            <li><FiSettings className="avatarDropDownIcon" /> Settings</li>
                            <li>Log out</li>
                        </ul>}
                    </li>
                </ul>

            </nav>
        </header>
    );
}

export default NavBar;