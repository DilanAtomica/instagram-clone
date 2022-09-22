import React from 'react';
import "./InboxPage.css";
import {HiOutlinePencilAlt} from "react-icons/hi";

function InboxPage(props) {
    return (
        <div className="inboxPage">
            <div className="inboxContainer">
                <div className="inboxLeft">
                    <div className="inboxLeft-top">
                        <h1>Dilan</h1>
                        <HiOutlinePencilAlt id="pencilIcon"/>
                    </div>
                    <div className="inboxLeft-bottom">
                        <div className="inboxLeft-user">
                            <img src="https://www.vectornator.io/blog/content/images/2022/03/62024ea00c20c3ee4ef61310_Studio-Ghibli-Thumbnail.png" />
                            <h2>Oskar</h2>
                        </div>
                    </div>
                </div>
                <div className="inboxRight">
                    <div className="inboxRight-top">
                        <img src="https://www.vectornator.io/blog/content/images/2022/03/62024ea00c20c3ee4ef61310_Studio-Ghibli-Thumbnail.png" />
                        <h2>Dilan</h2>
                    </div>
                    <div className="inboxRight-bottom">
                        <div className="inboxRight-messageBox">
                            <div className="inboxRight-message">
                                <p>My guy, can you give me the inside scoop on Yozora? I promise i won't tell anyone. And just to prove to you that i'll keep my mouth shut, i'll have you know i've finished KH2 on critical mode. Yeh, you heard right. Anyways, godspeed.</p>
                            </div>
                        </div>
                        <form>
                            <input type="text" placeholder="Send a message..."/>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default InboxPage;