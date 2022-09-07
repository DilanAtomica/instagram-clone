import React, {useContext} from 'react';
import "./PostModalContainer.css";
import {HiOutlineHeart} from "react-icons/hi";
import {FaRegComment} from "react-icons/fa";
import {VscSmiley} from "react-icons/vsc";
import {AppContext} from "../../App";

function PostModalContainer({image, text, timestamp, postID, publisherID, publisherName, publisherAvatar}) {

    const {hidePostModal} = useContext(AppContext);

    const handleOnClick = (e) => {
        hidePostModal(e);
    }

    return (
        <div onClick={handleOnClick} className="postModalContainer" id="postModalContainer">
        <div className="postModal">
            <div className="postModalLeft">
                <img src={image} />
            </div>
            <div className="postModalRight">
                <div className="postModalRightHeader">
                    <img src={publisherAvatar} />
                    <h1>{publisherName}</h1>
                    <span>•</span>
                    <button type="button">Follow</button>
                </div>
                <div className="postModalCommentsContainer">
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> {text}</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>

                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>
                    <div className="postModalComment">
                        <img src="https://filterblog.s3.amazonaws.com/2014/08/ghibli-totoro.jpg" />
                        <div className="postModalComment-right">
                            <p><span>someGuy</span> Had a great time!</p>
                            <div className="postModalCommentDate">
                                <p>1 week</p>
                                <button type="button">Reply</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="postModalActions">
                    <HiOutlineHeart id="heartIcon" />
                    <FaRegComment />
                </div>
                <p id="likesCounter">10,654 likes</p>
                <p id="postDate">POSTED 7 DAYS AGO</p>
                <form className="postModalInputContainer">
                    <VscSmiley id="smileyIcon" />
                    <input type="text" placeholder="Write a comment..." />
                    <button type="submit">Publish</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default PostModalContainer;