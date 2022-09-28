import React from 'react';
import "./PostingModalHeader.css";
import Button from "../Buttons/Button";

function PostingModalHeader(props) {
    return (
        <div className="postingModalHeader">
            <h2>Create a new post</h2>
            <Button type="submit" text="Share" fontSize="14" padding="0.75rem 0.5rem 0.5rem" />
        </div>
    );
}

export default PostingModalHeader;