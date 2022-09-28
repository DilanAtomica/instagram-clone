import React from 'react';
import "./ProfilePagePostsContainer.css";
import ProfilePagePost from "./ProfilePagePost";

function ProfilePagePostsContainer({posts}) {
    return (
        <div className="profilePagePostsContainer">
            {posts.map(post => (
                <ProfilePagePost key={post.id} image={post.image} text={post.text} timestamp={post.timestamp} postID={post.id}
                                 publisherID={post.publisherID}/>
            ))}
        </div>
    );
}

export default ProfilePagePostsContainer;