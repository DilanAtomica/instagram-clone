import React from 'react';
import "./HomePagePostsContainer.css";
import HomePagePost from "./HomePagePost";

function HomePagePostsContainer({followingPosts, visitProfilePage, likePost, commentPost, showPostModal}) {
    return (
        <div className="homePagePostsContainer">
            {followingPosts?.map(post => (
                <HomePagePost key={post.data.id} image={post.data.image} text={post.data.text}
                              username={post.username} avatar={post.avatar} publisherID={post.data.publisherID}
                              showPostModal={showPostModal} timestamp={post.data.timestamp} postID={post.data.id}
                              likePost={likePost} likes={post.likes} isLiked={post.likedByUser}
                              randomUserLikeName={post.randomUserLikeName} randomUserLikeAvatar={post.randomUserLikeAvatar}
                              randomUserID={post.randomUserID} commentPost={commentPost} visitProfilePage={visitProfilePage}/>
            ))}
        </div>
    );
}

export default HomePagePostsContainer;