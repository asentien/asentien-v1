import React from "react";
import "./ProfileFollowersFollowing.css";

const ProfileFollowersFollowing = ({
  profileUser,
  openFollowersModal,
  openFollowingModal,
}) => {
    
  return (
    <div id='profileFollowersFollowing'>
      <div id='profileFollowers' type='button' onClick={openFollowersModal}>
        <strong>{profileUser?.followers?.length}</strong>{" "}
        {profileUser?.followers?.length === 1 ? "follower" : "followers"}
      </div>

      <div id='profileFollowing' type='button' onClick={openFollowingModal}>
        <strong>{profileUser?.following?.length}</strong> following
      </div>
    </div>
  );
};

export default ProfileFollowersFollowing;
