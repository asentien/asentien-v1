import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { baseRoutes } from "../../routes";
import CloseButton from "../CloseButton/CloseButton";
import GrayLine from "../GrayLine/GrayLine";
import { isHandheldDevice } from "../../utils";

import FollowButton from "../FollowButton/FollowButton";
import DeactivatePost from "../Deactivate/DeactivatePost/DeactivatePost";
import AcceleratorPromotionButton from "../AcceleratorPromotionButton/AcceleratorPromotionButton";
import AsentientPromotionButton from "../AsentientPromotionButton/AsentientPromotionButton";
import CreateReportButton from "../CreateReportButton/CreateReportButton";
import TextLink from "../TextLink/TextLink";

import "./PostDropdownContent.css";

const PostDropdownContent = ({ post, onClose, signupRedirect }) => {
  const user = useSelector(selectUser);

  const [reportDisplayNone, setReportDisplayNone] = useState(false);
  const [asentientDisplayNone, setAsentientDisplayNone] = useState(false);
  const [acceleratorDisplayNone, setAcceleratorDisplayNone] = useState(false);

  const handleReportDisplayNone = () => {
    setReportDisplayNone(true);
  };

  const handleAsentientPromotionDisplayNone = () => {
    setAsentientDisplayNone(true);
  };

  const handleAcceleratorPromotionDisplayNone = () => {
    setAcceleratorDisplayNone(true);
    setAsentientDisplayNone(true);
  };

  return (
    <>
      <div id='dropdownsTitle'>
        <TextLink
          to={baseRoutes?.postDetail(post?.id)}
          textLinkId={"postDropdownLinkTitle"}
        >
          Post Detail
        </TextLink>

        <CloseButton
          handleClick={onClose}
          closeButtonStyle={{ height: "20px", width: "20px" }}
        />
      </div>

      <GrayLine grayLineStyle={{ marginBottom: "3px" }} />

      <div id='postDropdownMenu'>
        <div className='postDropdownItems' type='button'>
          <TextLink
            to={baseRoutes?.postDetail(post?.id)}
            textLinkId={"postDropdownLink"}
            textLinkStyle={{
              paddingRight: "54px",
            }}
          >
            <svg id='postDropdownIcons' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z'
              />
            </svg>
            Post Detail
          </TextLink>
        </div>
        {user?.username !== post?.author?.username && !isHandheldDevice && (
          <div
            className='postDropdownItems'
            type='button'
            onClick={!user ? signupRedirect : undefined}
          >
            <FollowButton user={post?.author} isPostDropdown={true} />
          </div>
        )}
        {user?.username !== post?.author?.username && !reportDisplayNone && (
          <div
            className='postDropdownItems'
            type='button'
            onClick={!user ? signupRedirect : handleReportDisplayNone}
          >
            <CreateReportButton postId={post?.id} />
          </div>
        )}
        {user?.username === post?.author?.username ||
        (!post?.author?.is_asentient &&
          user?.is_accelerator &&
          !acceleratorDisplayNone &&
          !asentientDisplayNone) ? (
          <div className='postDropdownItems' type='button'>
            <DeactivatePost postId={post?.id} type='post' />
          </div>
        ) : undefined}
        {user?.is_accelerator &&
          !post?.author?.is_asentient &&
          !acceleratorDisplayNone &&
          !asentientDisplayNone &&
          !isHandheldDevice && (
            <div
              onClick={handleAsentientPromotionDisplayNone}
              className='postDropdownItems'
              type='button'
            >
              <AsentientPromotionButton
                user={post?.author}
                isPostDropdown={true}
              />
            </div>
          )}
        {user?.is_accelerator &&
          user?.is_staff &&
          !post?.author?.is_accelerator &&
          !acceleratorDisplayNone &&
          !isHandheldDevice && (
            <div
              onClick={handleAcceleratorPromotionDisplayNone}
              className='postDropdownItems'
              type='button'
            >
              <AcceleratorPromotionButton
                user={post?.author}
                isPostDropdown={true}
              />
            </div>
          )}
      </div>
    </>
  );
};

export default PostDropdownContent;
