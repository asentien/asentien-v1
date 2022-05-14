import React from "react";

import "./NotificationContent.css";
import "../../styles/components.css";

const NotificationContent = ({ notification }) => {
  const NotificationHeader = (
    <>
      {notification?.choice !== 6 && (
        <>
          <strong>
            {notification?.sender?.first_name} {notification?.sender?.last_name}
          </strong>
          ,
          <br />
        </>
      )}
    </>
  );

  const NotificationMessage = (
    <>
      {notification?.choice === 1 ? (
        <>
          now <strong id='notificationTypeLink'>follows</strong> you.
        </>
      ) : notification?.choice === 2 ? (
        <>
          <strong id='notificationTypeLink'>liked</strong> your post.
        </>
      ) : notification?.choice === 3 ? (
        <>
          <strong id='notificationTypeLink'>commented</strong> on your post.
        </>
      ) : notification?.choice === 4 ? (
        <>
          <strong id='notificationTypeLink'>shared</strong> your post.
        </>
      ) : notification?.choice === 5 ? (
        <>
          promoted you to
          <br />
          <strong id='notificationTypeLinkPromotion'>Asentient</strong> status.
        </>
      ) : notification?.choice === 6 ? (
        <>
          You've been promoted to
          <br />
          <strong id='notificationTypeLinkPromotion'>Accelerator</strong>{" "}
          status.
        </>
      ) : undefined}
    </>
  );

  const Notification = (
    <div id='notificationLinkStyle'>
      {NotificationHeader}
      {NotificationMessage}
    </div>
  );

  return <>{Notification}</>;
};

export default NotificationContent;
