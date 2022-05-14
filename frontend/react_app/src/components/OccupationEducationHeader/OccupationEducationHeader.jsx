import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { isHandheldDevice } from "../../utils";
import TextLink from "../TextLink/TextLink";

import "../PostHeader/PostHeader.css";
import "./OccupationEducationHeader.css";
import "../../styles/components.css";

const OccupationEducationHeader = ({
  dataType,
  post,
  isPopularUserPage,
  headerLinkTo,
  headerLinkId,
  isShared,
}) => {
  dayjs.extend(relativeTime);
  const user = useSelector(selectUser);

  const occupationEducationHeaderContent = (
    <>
      {isPopularUserPage && (
        <div id='occupationEducationHeaderAdditional'>
          <strong>{dataType?.followers?.length}</strong>{" "}
          {dataType?.followers?.length === 1 ? "follower" : "followers"}
        </div>
      )}
      {dataType?.is_asentient && !isPopularUserPage && (
        <div
          id={
            isShared
              ? "occupationEducationHeaderAdditionalShrink"
              : "occupationEducationHeaderAdditional"
          }
          style={{
            marginRight: isShared && isHandheldDevice && "-44px",
          }}
        >
          {dataType?.is_asentient && (
            <>
              {dataType?.is_accelerator && (
                <strong id='occupationEducationAsentientAcceleratorIcons'>
                  a+
                </strong>
              )}
              <strong id='occupationEducationAsentientAcceleratorIcons'>
                {dataType?.is_asentient && "a"}
              </strong>
            </>
          )}
        </div>
      )}
      <div
        id='headerFullNameUsername'
        style={{
          marginTop: isShared && "6.5px",
          marginLeft: isShared && isHandheldDevice && "4px",
        }}
      >
        <strong style={{ color: "#000" }}>
          {dataType?.username === user?.username ? (
            <>
              {user?.first_name} {user?.last_name}
            </>
          ) : (
            <>
              {dataType?.first_name} {dataType?.last_name}
            </>
          )}
        </strong>{" "}
        @
        {dataType?.username === user?.username
          ? user?.username
          : dataType?.username}{" "}
        {post && (
          <strong id='postCreatedAt'>
            - {dayjs(post?.created_at).fromNow()}
          </strong>
        )}
        <div
          id='headerOccupationEducation'
          style={{
            color: "black",
          }}
        >
          <svg id='headerOccupationEducationIcons' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z'
            />
          </svg>
          {dataType?.username === user?.username
            ? user?.profile?.occupation
            : dataType?.profile?.occupation}
          <svg
            id='headerOccupationEducationIcons'
            style={{
              marginLeft: "5px",
            }}
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z'
            />
          </svg>

          <div id='headerOccupationEducationText'>
            {dataType?.username === user?.username
              ? user?.profile?.education
              : dataType?.profile?.education}
          </div>
        </div>
      </div>
    </>
  );
  return (
    <>
      {isShared ? (
        <>{occupationEducationHeaderContent}</>
      ) : (
        <TextLink
          to={headerLinkTo}
          textLinkId={headerLinkId || "headerLinkStyle"}
        >
          {occupationEducationHeaderContent}
        </TextLink>
      )}
    </>
  );
};

export default OccupationEducationHeader;
