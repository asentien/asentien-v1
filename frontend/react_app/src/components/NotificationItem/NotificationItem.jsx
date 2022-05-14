import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { useDispatch } from "react-redux";
import { key, removeNotification } from "../../redux/notifications";
import useUI from "../../hooks/useUI";
import { baseRoutes } from "../../routes";
import NotificationContent from "../NotificationContent/NotificationContent";

import "../UserList/UserList.css";
import "./NotificationItem.css";
import "../../styles/components.css";
import baseAvatar from "../baseAvatar.png";
import Avatar from "../Avatar/Avatar";
import TextLink from "../TextLink/TextLink";

const NotificationItem = ({
  notification,
  onClose,
  onOpenAcceleratorModal,
  onOpenAsentientModal,
  isDropdown,
}) => {
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);

  const { loading } = useUI(
    key.removeNotification(notification.id),
    null,
    false
  );

  const handleRemove = () => {
    if (!loading) {
      dispatch(removeNotification(notification.id));
    }
  };

  let notificationLinkTo;
  // eslint-disable-next-line no-unused-vars
  const notificationsArray = [
    notification.choice === 1
      ? (notificationLinkTo = baseRoutes?.userPosts(
          notification?.sender?.username
        ))
      : notification.choice === 2
      ? (notificationLinkTo =
          baseRoutes?.postDetail(notification?.post?.id) + "")
      : // -likes doesnt work appends to backend url for some reason
      notification.choice === 3
      ? (notificationLinkTo =
          baseRoutes?.postDetail(notification?.post?.id) + "")
      : // -comments
      notification.choice === 4
      ? (notificationLinkTo =
          baseRoutes?.postDetail(notification?.post?.id) + "")
      : // -shares
        (notificationLinkTo = "#"),
  ];

  return (
    <>
      <div id='userListContainer'>
        <TextLink
          to={notificationLinkTo}
          textLinkStyle={{
            display: "flex",
            overflow: "hidden",
          }}
          handleClick={
            notification?.choice === 5
              ? onOpenAsentientModal
              : notification?.choice === 6
              ? onOpenAcceleratorModal
              : onClose
          }
        >
          <Avatar
            isLink={false}
            avatarDivStyle={{
              marginLeft: !isDropdown && "5px",
            }}
            avatarDivId={isDropdown ? "avatarMarginLeft" : undefined}
            avatarImageSource={
              notification?.choice !== 6
                ? notification?.sender?.profile?.avatar
                : baseAvatar
            }
            avatarImageStyle={{ marginTop: "8px" }}
          />
          <div
            style={{
              marginLeft: "5px",
              marginTop: "3.8px",
            }}
          >
            {notification?.choice === 6 && notification?.choice === 5 && (
              <strong style={{ color: "#75f200" }}>Congratulations!</strong>
            )}{" "}
            <div
              id='headerOccupationEducation'
              style={{
                fontSize: "0.75rem",
                marginLeft: "0px",
                display: "block",
              }}
            >
              <strong id='notificationCreatedAt'>
                {dayjs(notification?.created_at).fromNow()}
              </strong>
              <NotificationContent notification={notification} />
            </div>
          </div>
        </TextLink>

        {!isDropdown && (
          <svg
            onClick={handleRemove}
            id='notificationIconDeactivate'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default NotificationItem;
