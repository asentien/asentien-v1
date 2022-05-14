/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUnreadNotificationsCount,
  selectUnreadNotificationsCount,
} from "../../redux/notifications";

import { access } from "../../services/baseServicesHandler";
import SearchInput from "../SearchInput/SearchInput";
import Avatar from "../Avatar/Avatar";
import "./TopNavigationContent.css";
import AuthenticationHelmet from "../AuthenticationHelmet/AuthenticationHelmet";
import { baseRoutes } from "../../routes";
import SearchPopularInput from "../SearchInput/SearchPopularInput";

const TopNavigationContent = ({
  user,
  openTopNotification,
  openTopNavigation,
  openTopSearch,
  openPostFormModal,
  openAsentientInfoModal,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const unreadNotificationsCount = useSelector(selectUnreadNotificationsCount);

  useEffect(() => {
    if (access !== null && !unreadNotificationsCount) {
      dispatch(getUnreadNotificationsCount());
    }
    const interval = setInterval(() => {
      if (access !== null) {
        dispatch(getUnreadNotificationsCount());
      }
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const goBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AuthenticationHelmet
        ahId={"searchButton"}
        ahClick={
          user &&
          location.pathname !== "/users" &&
          location.pathname !== "/popular-users"
            ? openTopSearch
            : undefined
        }
      >
        {location.pathname === baseRoutes.popularUsers ? (
          <SearchPopularInput />
        ) : (
          <SearchInput />
        )}
      </AuthenticationHelmet>
      <div id='topNavNavigation'>
        <AuthenticationHelmet
          ahId={"topNavNotificationIconCreate"}
          ahClick={
            user?.is_asentient
              ? openPostFormModal
              : user
              ? openAsentientInfoModal
              : undefined
          }
        >
          <svg id='topNavNotificationIcon' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'
            />
          </svg>
        </AuthenticationHelmet>
        {unreadNotificationsCount !== 0 && (
          <div id='topNavUnreadOuter'>
            <div id='topNavUnreadMiddle'>
              <div id='topNavUnreadInner'>{unreadNotificationsCount}</div>
            </div>
          </div>
        )}
        <AuthenticationHelmet
          ahId={"topNavNotificationIconNotification"}
          ahClick={
            user && location.pathname === "/notifications"
              ? goBackToTop
              : openTopNotification
          }
        >
          <svg id='topNavNotificationIcon' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21'
            />
          </svg>
        </AuthenticationHelmet>
        <Avatar
          isLink={false}
          avatarDivStyle={{ marginTop: "1px" }}
          avatarImageId={"topNavAvatar"}
          handleClick={openTopNavigation}
        />
      </div>
    </>
  );
};

export default TopNavigationContent;
