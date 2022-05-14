/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { Waypoint } from "react-waypoint";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  key,
  selectNotifications,
  selectUnreadNotificationsCount,
} from "../../redux/notifications";
import { selectUser } from "../../redux/user";
import { access } from "../../services/baseServicesHandler";
import useUI from "../../hooks/useUI";
import LoadingUserList from "../../components/Loading/LoadingUserList";
import NotificationItem from "../../components/NotificationItem/NotificationItem";
import BaseContainer from "../../components/BaseContainer/BaseContainer";
import PageNotice from "../../components/PageNotice/PageNotice";
import PageRenderContainer from "../../components/PageRenderContainer/PageRenderContainer";

import "../../styles/pages.css";

const AsentientNotificationsModal = lazy(() =>
  import("../../components/NotificationItem/AsentientNotificationsModal")
);
const AcceleratorsNotificationsModal = lazy(() =>
  import("../../components/NotificationItem/AcceleratorNotificationsModal")
);

const Notifications = () => {
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const [showAcceleratorModal, setShowAcceleratorModal] = useState(false);
  const [showAsentientModal, setShowAsentientModal] = useState(false);
  const notifications = useSelector(selectNotifications);
  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);
  const user = useSelector(selectUser);

  const { fetched, loading, nextLoading } = useUI(
    key.notifications,
    key.notificationsNext
  );

  useEffect(() => {
    if ((access && unreadNotificationsCount > 0) || (access && !fetched)) {
      dispatch(getNotifications());
    }
  }, []);

  const handleNext = () => {
    dispatch(getNotifications(notifications?.next));
  };

  const handleOpenAsentientModal = () => {
    setShowAsentientModal(true);
  };

  const handleOpenAcceleratorModal = () => {
    setShowAcceleratorModal(true);
  };

  const renderNotifications = () => {
    let renderedNotifications;
    if (!user) {
      renderedNotifications = <></>;
    } else if (loading) {
      renderedNotifications = (
        <>
          <LoadingUserList isMinified={false} />
        </>
      );
    } else if (notifications?.results?.length) {
      renderedNotifications = (
        <>
          {notifications?.results?.map((notification) => (
            <NotificationItem
              key={notification?.id}
              notification={notification}
              onOpenAcceleratorModal={handleOpenAcceleratorModal}
              onOpenAsentientModal={handleOpenAsentientModal}
            />
          ))}
        </>
      );
    } else {
      renderedNotifications = (
        <>
          <div id='pageHeading'>
            <div id='pageTextStyle'>No notifications could be found.</div>
          </div>
        </>
      );
    }
    return renderedNotifications;
  };

  const pageNoticeTitle = <>Notifications</>;
  const pageNoticeBody = (
    <>
      {user && (
        <>
          Belonging to {user?.first_name} {user?.last_name}
        </>
      )}
    </>
  );

  return (
    <>
      <BaseContainer isSpecialPage>
        <div id='pageHeading'>
          <PageNotice
            pageNoticeTitle={pageNoticeTitle}
            pageNoticeBody={pageNoticeBody}
          />
        </div>

        <PageRenderContainer>
          {renderNotifications()}
          {notifications && notifications?.next && nextLoading && (
            <>
              <LoadingUserList isMinified={false} />
            </>
          )}
        </PageRenderContainer>
      </BaseContainer>

      {notifications && notifications?.next && !nextLoading && (
        <>
          <Waypoint
            onEnter={handleNext}
            loading={nextLoading}
            nextUrl={notifications?.next}
          >
            <div />
          </Waypoint>
        </>
      )}
      <Suspense fallback={<></>}>
        {showAsentientModal && (
          <AsentientNotificationsModal notification={user} />
        )}
        {showAcceleratorModal && (
          <AcceleratorsNotificationsModal notification={user} />
        )}
      </Suspense>
    </>
  );
};

export default Notifications;
