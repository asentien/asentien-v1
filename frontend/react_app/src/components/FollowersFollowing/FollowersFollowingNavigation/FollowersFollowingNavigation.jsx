import React from "react";

import "../FollowersFollowing.css";
import GrayLine from "../../GrayLine/GrayLine";
import CloseButton from "../../CloseButton/CloseButton";

const FollowersFollowingNavigation = ({
  onClose,
  openFollowingModal,
  openFollowersModal,
  followersModal,
}) => {
  return (
    <>
      <div id='followersFollowingNavLinks'>
        <div
          id='followersFollowingNav'
          type='button'
          onClick={followersModal ? onClose : openFollowersModal}
          style={{
            color: followersModal ? "var(--primaryPurpleColor)" : "",
          }}
        >
          Followers
        </div>
        <div
          id='followersFollowingNav'
          type='button'
          onClick={followersModal ? openFollowingModal : onClose}
          style={{
            marginLeft: "5px",
            color: followersModal ? "" : "var(--primaryPurpleColor)",
          }}
        >
          Following
        </div>
        <CloseButton
          handleClick={followersModal ? onClose : onClose}
          closeButtonStyle={{
            marginLeft: "auto",
            marginTop: "-3px",
            height: "24px",
            width: "24px",
          }}
        />
      </div>
      <GrayLine grayLineStyle={{ marginTop: "5px" }} />
    </>
  );
};

export default FollowersFollowingNavigation;
