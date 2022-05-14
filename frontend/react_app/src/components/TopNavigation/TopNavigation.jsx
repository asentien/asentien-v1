/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../../redux/user";
import {
  getReQueryHomeFeed,
  setClearHomeFeed,
  getReQueryPublicFeed,
  setClearPublicFeed,
} from "../../redux/post";
import { baseRoutes } from "../../routes";

import SearchDropdown from "../SearchDropdown/SearchDropdown";
import NavigationDropdown from "../NavigationDropdown/NavigationDropdown";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import TextLink from "../TextLink/TextLink";

import "./TopNavigation.css";
import logo from "../logoCropped.png";

const TopNavigationContent = lazy(() =>
  import("../TopNavigationContent/TopNavigationContent")
);
const AsentientInfoModal = lazy(() =>
  import("../AsentientInfoModal/AsentientInfoModal")
);

const ContactForm = lazy(() => import("../ContactForm/ContactForm"));
const PostFormModal = lazy(() => import("../PostForm/PostFormModal"));
const AcceleratorsNotificationsModal = lazy(() =>
  import("../NotificationItem/AcceleratorNotificationsModal")
);
const AsentientNotificationsModal = lazy(() =>
  import("../NotificationItem/AsentientNotificationsModal")
);
const SignupForm = lazy(() =>
  import("../Unauthenticated/SignupForm/SignupForm")
);
const LoginForm = lazy(() => import("../Unauthenticated/LoginForm/LoginForm"));

const TopNavigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [showTopNotification, setShowTopNotification] = useState(false);
  const [showTopNavigation, setShowTopNavigation] = useState(false);
  const [postFormModal, setPostFormModal] = useState(false);
  const [asentientInfoModal, setAsentientInfoModal] = useState(false);
  const [signupModal, setSignUpModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [showTopSearch, setShowTopSearch] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [showAcceleratorModal, setShowAcceleratorModal] = useState(false);
  const [showAsentientModal, setShowAsentientModal] = useState(false);

  const [scrolledTimeoutHome, setScrolledTimeoutHome] = useState(null);
  const [scrolledTimeoutPublic, setScrolledTimeoutPublic] = useState(null);
  const [hasScrolledTopHome, setHasScrolledTopHome] = useState(false);
  const [hasScrolledTopPublic, setHasScrolledTopPublic] = useState(false);
  const reQueryHomeFeed = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScrolledTimeoutHome(setTimeout(() => setHasScrolledTopHome(true), 800));
  };

  const reQueryPublicFeed = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScrolledTimeoutPublic(
      setTimeout(() => setHasScrolledTopPublic(true), 800)
    );
  };

  useEffect(() => {
    if (hasScrolledTopHome) {
      dispatch(setClearHomeFeed());
      dispatch(getReQueryHomeFeed());
      clearTimeout(scrolledTimeoutHome);
      setHasScrolledTopHome(false);
    }
  }, [reQueryHomeFeed]);

  useEffect(() => {
    if (hasScrolledTopPublic) {
      dispatch(setClearPublicFeed());
      dispatch(getReQueryPublicFeed());
      clearTimeout(scrolledTimeoutPublic);
      setHasScrolledTopPublic(false);
    }
  }, [reQueryPublicFeed]);

  const handleCloseContactModal = () => {
    setContactModal(false);
  };

  const handleOpenContactModal = () => {
    setContactModal(true);
  };

  const handleOpenSignupModal = () => {
    setSignUpModal(true);
    setShowTopNavigation(false);
  };

  const handleCloseSignupModal = () => {
    setSignUpModal(false);
  };

  const handleOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModal(false);
  };

  const handleShowTopSearch = () => {
    if (location?.pathname !== "/users") {
      setShowTopSearch(true);
      setShowTopNotification(false);
      setShowTopNavigation(false);
    }
  };

  const handleCloseTopSearch = () => {
    if (location?.pathname !== "/users") {
      setShowTopSearch(false);
    }
  };

  const handleOpenShowTopNotification = () => {
    if (location?.pathname !== "/notifications") {
      setShowTopSearch(false);
      setShowTopNavigation(false);
      setShowTopNotification(true);
    }
  };

  const handleOpenShowTopNavigation = () => {
    setShowTopSearch(false);
    setShowTopNotification(false);
    setShowTopNavigation(true);
  };

  const handleCloseShowTopNotification = () => {
    if (location?.pathname !== "/notifications") {
      setShowTopNotification(false);
    }
  };

  const handleCloseShowTopNavigation = () => {
    setShowTopNavigation(false);
  };

  const handleOpenPostFormModal = () => {
    setShowTopNotification(false);
    setShowTopNavigation(false);
    setShowTopSearch(false);
    setPostFormModal(true);
  };

  const handleOpenAsentientInfoModal = () => {
    setShowTopNotification(false);
    setShowTopNavigation(false);
    setShowTopSearch(false);
    setPostFormModal(false);
    setAsentientInfoModal(true);
  };

  const handleCloseAsentientInfoModal = () => {
    setAsentientInfoModal(false);
  };

  const handleClosePostFormModal = () => {
    setPostFormModal(false);
  };

  const handleOpenAsentientModal = () => {
    setShowAsentientModal(true);
  };

  const handleOpenAcceleratorModal = () => {
    setShowAcceleratorModal(true);
  };

  return (
    <>
      <div id='topNavDivNav'>
        <div id='topNav'>
          <div
            id='topNavLogo'
            onClick={
              user &&
              (location?.pathname === "/" || location?.pathname === "/home")
                ? reQueryHomeFeed
                : !user &&
                  (location?.pathname === "/" ||
                    location?.pathname === "/public")
                ? reQueryPublicFeed
                : undefined
            }
          >
            <TextLink to={baseRoutes?.index}>
              <img src={logo} alt='Logo' loading='lazy' id='topNavLogoImage' />
            </TextLink>
          </div>
          <Suspense fallback={<></>}>
            <TopNavigationContent
              user={user}
              openSignupModal={handleOpenSignupModal}
              openTopNotification={handleOpenShowTopNotification}
              openTopNavigation={handleOpenShowTopNavigation}
              openTopSearch={handleShowTopSearch}
              showTopSearch={showTopSearch}
              closeTopSearch={handleCloseTopSearch}
              openPostFormModal={handleOpenPostFormModal}
              openAsentientInfoModal={handleOpenAsentientInfoModal}
            />
          </Suspense>
        </div>

        {showTopNotification && location.pathname !== "/notifications" && (
          <NotificationDropdown
            onClose={handleCloseShowTopNotification}
            onOpenAcceleratorModal={handleOpenAcceleratorModal}
            onOpenAsentientModal={handleOpenAsentientModal}
            displayNone={showAsentientModal || showAcceleratorModal}
          />
        )}

        {user &&
          showTopSearch &&
          location.pathname !== "/users" &&
          location.pathname !== "/popular-users" && (
            <SearchDropdown onClose={handleCloseTopSearch} />
          )}

        {showTopNavigation && (
          <NavigationDropdown
            onClose={handleCloseShowTopNavigation}
            handleOpenSignupModal={handleOpenSignupModal}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenContactModal={handleOpenContactModal}
            navigationDisplayNone={signupModal || loginModal || contactModal}
          />
        )}
      </div>
      <Suspense fallback={<></>}>
        {!user && signupModal && (
          <SignupForm onClose={handleCloseSignupModal} />
        )}
        {!user && loginModal && <LoginForm onClose={handleCloseLoginModal} />}
        {user && contactModal && (
          <ContactForm onClose={handleCloseContactModal} />
        )}
        {user?.is_asentient && postFormModal && (
          <PostFormModal onClose={handleClosePostFormModal} />
        )}
        {user && asentientInfoModal && (
          <AsentientInfoModal onClose={handleCloseAsentientInfoModal} />
        )}
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

export default TopNavigation;
