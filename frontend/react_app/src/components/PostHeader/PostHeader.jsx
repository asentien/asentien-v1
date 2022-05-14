import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { baseRoutes } from "../../routes";
import PostDropdown from "../PostDropdown/PostDropdown";
import Avatar from "../Avatar/Avatar";
import PostHover from "../PostHover/PostHover";
import OccupationEducationHeader from "../OccupationEducationHeader/OccupationEducationHeader";

import "./PostHeader.css";
import "../../styles/components.css";


const PostHeader = ({
  post,
  share,
  comment,
  childPost,
  signupRedirect,
  showSignupModal,
  isShared,
}) => {
  dayjs.extend(relativeTime);
  const user = useSelector(selectUser);

  const [avatarTimeout, setAvatarTimeout] = useState(null);
  const [showAvatarHover, setShowAvatarHover] = useState(false);
  const [showPostDropdown, setShowPostDropdown] = useState(false);

  const handleOpenShowPostDropdown = () => {
    setShowPostDropdown(true);
  };

  const handleCloseShowPostDropdown = () => {
    setShowPostDropdown(false);
  };

  const handleMouseEnter = () => {
    setAvatarTimeout(setTimeout(() => setShowAvatarHover(true), 1000));
  };

  const handleMouseLeave = () => {
    setShowAvatarHover(false);
    clearTimeout(avatarTimeout);
  };

  return (
    <div
      id='headerContainer'
      style={{
        borderRadius: childPost || isShared ? "0" : "",
        paddingBottom: isShared && "0",
      }}
    >
      <div id={!isShared ? "header" : "headerShrink"}>
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
       
          <Avatar
            isLink={isShared ? false : true}
            avatarLinkTo={
              !isShared
                ? baseRoutes.userPosts(post?.author?.username)
                : baseRoutes?.postDetail(post?.id)
            }
            avatarImageSource={
              post?.author?.username === user?.username
                ? user?.profile?.avatar
                : post?.author?.profile?.avatar
            }
            avatarImageStyle={{
              marginTop: post?.author?.is_asentient && !isShared && "7px",
            }}
          />
    
          {showAvatarHover && !isShared && (
            <PostHover
              post={post}
              childPost={post !== comment || share ? childPost === false : true}
              isShared={isShared}
            />
          )}
        </div>
     
        <OccupationEducationHeader
          post={post}
          dataType={post?.author}
          headerLinkTo={
            !isShared
              ? baseRoutes.userPosts(post?.author?.username)
              : baseRoutes?.postDetail(post?.id)
          }
          isShared={isShared}
        />
 
        {!isShared && (
          <div id='headerDropdownIconContainer'>
            <svg
              onClick={handleOpenShowPostDropdown}
              id='headerDropdownIcon'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z'
              />
            </svg>

            {showPostDropdown && !showSignupModal && (
              <PostDropdown
                post={post}
                signupRedirect={signupRedirect}
                onClose={handleCloseShowPostDropdown}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostHeader;
