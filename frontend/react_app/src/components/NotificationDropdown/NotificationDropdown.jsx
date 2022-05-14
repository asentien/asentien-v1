/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  key,
  selectNotifications,
  selectUnreadNotificationsCount,
} from "../../redux/notifications";
import { selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Dropdown from "../Dropdown/Dropdown";
import LoadingUserList from "../Loading/LoadingUserList";
import NotificationItem from "../NotificationItem/NotificationItem";


const NotificationDropdown = ({
  onClose,
  onOpenAcceleratorModal,
  onOpenAsentientModal,
  displayNone,
}) => {
  dayjs.extend(relativeTime);
  const ref = useRef();
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);
  const user = useSelector(selectUser);

  const { fetched, loading } = useUI(key.notifications);

  useEffect(() => {
    if ((user && unreadNotificationsCount > 0) || (user && !fetched)) {
      dispatch(getNotifications());
    }
  }, []);

  useOnClickOutside(ref, onClose);

  const renderNotifications = () => {
    let renderedNotifications;
    if (!user) {
      renderedNotifications = <></>;
    } else if (loading) {
      renderedNotifications = <LoadingUserList isDropdown={true} />;
    } else if (notifications?.results?.length) {
      renderedNotifications = (
        <>
          {notifications.results.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={onClose}
              onOpenAcceleratorModal={onOpenAcceleratorModal}
              onOpenAsentientModal={onOpenAsentientModal}
              isDropdown={true}
            />
          ))}
        </>
      );
    } else {
      renderedNotifications = (
        <>
          <div id='dropdownText'>
            You've got no notifications at the moment.
          </div>
        </>
      );
    }
    return renderedNotifications;
  };

  return (
    <>
      <Dropdown
        notification
        notificationDisplayNone={displayNone}
        linkTitle={"Notifications"}
        onClose={onClose}
        render={
          renderNotifications()
        }
      />
    </>
  );
};

export default NotificationDropdown;
