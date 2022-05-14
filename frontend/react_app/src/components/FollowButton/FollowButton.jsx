import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  follow,
  key,
  selectFollowing,
  unfollow,
  selectUser,
} from "../../redux/user";
import useUI from "../../hooks/useUI";

import "./FollowButton.css";
import "../../styles/components.css";
import AuthenticationHelmet from "../AuthenticationHelmet/AuthenticationHelmet";

const FollowButton = ({ user, isPostDropdown, isProfile }) => {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const following = useSelector((s) => selectFollowing(s, user?.username));

  const { loading } = useUI(key.follow(user?.username), null, false);

  const handleFollow = () => {
    if (stateUser && !loading) {
      if (following) {
        dispatch(unfollow(user?.username, user?.username));
      } else {
        dispatch(follow(user?.username, user?.username));
      }
    } else {
    }
  };

  const unfollowOrFollowing = isPostDropdown ? "Unfollow" : "Following";
  const followingOrFollow = following ? unfollowOrFollowing : "Follow";

  return (
    <>
      <AuthenticationHelmet
        ahStyle={{
        
          marginLeft: isProfile && "auto",
          marginTop: !isPostDropdown && "3px",
          marginRight: isProfile && "8px",
        }}
        ahId={
          !isPostDropdown && !isProfile ? "followButtonContainer" : undefined
        }
        ahClick={stateUser ? handleFollow : undefined}
      >
        <button
          className={
            following && !isPostDropdown
              ? "baseFollowingButton"
              : !following && !isPostDropdown
              ? "baseFollowButton"
              : "postDropdownFollowFollowingAsentientAcceleratorButton"
          }
          style={{
            border: isPostDropdown && "none",
            outline: isPostDropdown && "none",
            background: isPostDropdown && "none",
            marginLeft: isPostDropdown && "-6px",
          }}
          disabled={loading}
        >
          {isPostDropdown && (
            <svg
              id='followButtonDropdown'
              viewBox='0 0 24 24'
              style={{ marginLeft: "0px", height: "20px", width: "20px" }}
            >
              <path
                fill='currentColor'
                d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
              />
            </svg>
          )}{" "}
          {followingOrFollow}
        </button>
      </AuthenticationHelmet>
    </>
  );
};

export default FollowButton;
