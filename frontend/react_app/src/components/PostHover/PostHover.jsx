import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { baseRoutes } from "../../routes";
import FollowButton from "../FollowButton/FollowButton";

import "./PostHover.css";
import "../../styles/components.css";
import Avatar from "../Avatar/Avatar";
import TextLink from "../TextLink/TextLink";

const PostHover = ({ post, childPost, isShared }) => {
  const user = useSelector(selectUser);
  return (
    <>
      {!isShared && (
        <div id='avatarHover'>
          <div id='avatarHoverHeader'>
            <Avatar
              isLink={true}
              avatarLinkTo={baseRoutes.userPosts(post?.author?.username)}
              avatarLinkStyle={{ display: "flex" }}
              avatarImageSource={
                post?.author?.username === user?.username
                  ? user?.profile?.avatar
                  : post?.author?.profile?.avatar
              }
              avatarImageStyle={{
                width: "55px",
                height: "55px",
                marginTop: "-8px",
                marginLeft: "10px",
                marginRight: "8px",
              }}
            />
            <TextLink
              to={baseRoutes.userPosts(post?.author?.username)}
              textLinkId={"avatarHoverLinkStyle"}
            >
              <div>
                <strong>
                  {post?.author?.username === user?.username ? (
                    <>
                      {user?.first_name} {user?.last_name}
                    </>
                  ) : (
                    <>
                      {post?.author?.first_name} {post?.author?.last_name}
                    </>
                  )}
                </strong>
              </div>
              <div id='avatarHoverUsername'>
                @
                {post?.author?.username === user?.username
                  ? user?.username
                  : post?.author?.username}
              </div>
            </TextLink>
          </div>
          <div id='avatarHoverItemsMenu'>
            <div id='avatarHoverAAIconsContainer'>
              {post?.author?.is_asentient && (
                <div>
                  <strong id='avatarHoverAsentientIcon'>
                    {post?.author?.is_accelerator && "a+"}
                  </strong>
                  <strong id='avatarHoverAsentientIcon'>
                    {post?.author?.is_accelerator && "a"}
                  </strong>
                </div>
              )}
            </div>
            <div id='avatarHoverOccupation'>
              <svg id='headerOccupationEducationIcons' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z'
                />
              </svg>
              {post?.author?.username === user?.username
                ? user?.profile?.occupation
                : post?.author?.profile?.occupation}
            </div>
            <div id='avatarHoverEducation'>
              <svg
                id='headerOccupationEducationIcons'
                style={{
                  marginBottom: "5px",
                }}
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z'
                />
              </svg>
              <div
                style={{ marginBottom: "5px" }}
                id='headerOccupationEducationTextEducation'
              >
                {post?.author?.username === user?.username
                  ? user?.profile?.education
                  : post?.author?.profile?.education}
              </div>
            </div>
            {childPost === true && (
              <>
                {post?.author?.profile?.bio && (
                  <div style={{ marginBottom: "5px" }}>
                    {post?.author?.username === user?.username
                      ? user?.profile?.bio
                      : post?.author?.profile?.bio}
                  </div>
                )}
              </>
            )}
            {post?.author?.profile?.pronouns && post?.author?.profile?.gender && (
              <div style={{ marginBottom: "5px" }}>
                {post?.author?.username === user?.username
                  ? user?.profile?.pronouns
                  : post?.author?.profile?.pronouns}
                {"  "}-{"  "}
                {post?.author?.username === user?.username
                  ? user?.profile?.gender
                  : post?.author?.profile?.gender}
              </div>
            )}

            {user?.username !== post?.author?.username && user && (
              <div id='avatarHoverFollowButton'>
                <FollowButton user={post?.author} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostHover;
