import React from 'react';
import "./PostingModalUpload.css";

function PostingModalUpload({imageInput, uploadImage}) {

    const handleOnChange = (e) => {
        uploadImage(e);
    }

    return (
        <div className="postingModalUpload">
            {imageInput.length > 1 ? <img alt="Upload image" src={imageInput} /> :
                <label id="imageInputLabel" htmlFor="imageInput">
                    Upload image
                    <input id="imageInput" onChange={handleOnChange} className="profile-imageInput" type="file" />
                </label>
            }
        </div>
    );
}

export default PostingModalUpload;