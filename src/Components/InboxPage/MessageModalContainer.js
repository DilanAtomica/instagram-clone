import React, {useState} from 'react';
import "./MessageModalContainer.css";

function MessageModalContainer(props) {

    const [chosenUser, setChosenUser] = useState(null);

    const handleOnClick = (e) => {

    }

    return (
        <div className="messageModalContainer">
            <div className="messageModal">
                <div className="messageModalTop">
                    <h1>New Message</h1>
                    <button type="button">Next</button>
                </div>
                <div className="messageModalSuggestions">
                    <h2>Suggestions</h2>
                    <div className="messageModalSuggestion">
                        <div className="messageModalSuggestion-left">
                            <img src="https://www.vectornator.io/blog/content/images/2022/03/62024ea00c20c3ee4ef61310_Studio-Ghibli-Thumbnail.png" />
                            <h3>Oskar</h3>
                        </div>
                        <div onClick={handleOnClick} id="checkIcon"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageModalContainer;