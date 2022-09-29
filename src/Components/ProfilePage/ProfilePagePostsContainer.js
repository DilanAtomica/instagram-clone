import React from 'react';
import "./ProfilePagePostsContainer.css";
import ProfilePagePost from "./ProfilePagePost";

function ProfilePagePostsContainer({posts}) {
    return (
        <section>
        <ul className="profilePagePostsContainer">
            {posts.map(post => (
                <ProfilePagePost key={post.id} image={post.image} text={post.text} timestamp={post.timestamp} postID={post.id}
                                 publisherID={post.publisherID}/>
            ))}
        </ul>
        </section>
    );
}

export default ProfilePagePostsContainer;