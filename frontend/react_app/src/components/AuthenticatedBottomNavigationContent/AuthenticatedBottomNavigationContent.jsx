/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import {
  getReQueryHomeFeed,
  setClearHomeFeed,
  getReQueryPublicFeed,
  setClearPublicFeed,
} from "../../redux/post";
import { baseRoutes } from "../../routes";

import "./AuthenticatedBottomNavigationContent.css";

const AuthenticatedBottomNavigationContent = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
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

  const goBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (hasScrolledTopHome) {
      dispatch(setClearHomeFeed());
      dispatch(getReQueryHomeFeed());
      setHasScrolledTopHome(false);
      return () => clearTimeout(scrolledTimeoutHome);
    }
  }, [reQueryHomeFeed]);

  useEffect(() => {
    if (hasScrolledTopPublic) {
      dispatch(setClearPublicFeed());
      dispatch(getReQueryPublicFeed());
      setHasScrolledTopPublic(false);
      return () => clearTimeout(scrolledTimeoutPublic);
    }
  }, [reQueryPublicFeed]);

  return (
    <>
      <div id='bottomNavigationIconContainer'>
        <NavLink
          onClick={
            location.pathname === baseRoutes.index ||
            location.pathname === baseRoutes.home
              ? reQueryHomeFeed
              : undefined
          }
          to={user ? baseRoutes.index : baseRoutes.signup}
          exact={true}
          id='bottomNavigationIcon'
          style={{
            color: "var(--primaryDarkGrayColor)",
            textDecoration: "none",
            marginLeft: "0",
          }}
          activeStyle={{
            color: "var(--primaryPurpleColor)",
            marginLeft: "0",
          }}
        >
          <div id='iconsLarge'>
            <svg id='svgIcons' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z'
              />
            </svg>
          </div>
        </NavLink>

        <NavLink
          to={
            user && location.pathname === baseRoutes.mostLikedPosts
              ? baseRoutes.mostLikedPosts
              : user
              ? baseRoutes.public
              : baseRoutes.signup
          }
          onClick={
            location.pathname === baseRoutes.mostLikedPosts
              ? goBackToTop
              : location.pathname === baseRoutes.public
              ? reQueryPublicFeed
              : undefined
          }
          id='bottomNavigationIcon'
          style={{
            color: "var(--primaryDarkGrayColor)",
          }}
          activeStyle={{
            color: "var(--primaryPurpleColor)",
          }}
        >
          <div id='iconsLarge'>
            <svg id='svgIcons' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z'
              />
            </svg>
          </div>
        </NavLink>

        <NavLink
          to={
            user && location.pathname === baseRoutes.hashtagsAll
              ? baseRoutes.hashtagsAll
              : user
              ? baseRoutes.hashtags
              : baseRoutes.signup
          }
          onClick={
            location.pathname === baseRoutes.hashtags ||
            location.pathname === baseRoutes.hashtagsAll
              ? goBackToTop
              : undefined
          }
          id='bottomNavigationIcon'
          style={{
            textDecoration: "none",
            color: "var(--primaryDarkGrayColor)",
          }}
          activeStyle={{
            color: "var(--primaryPurpleColor)",
          }}
        >
          <div id='iconsLarge'>
            <svg id='svgIcons' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z'
              />
            </svg>
          </div>
        </NavLink>

        <NavLink
          to={
            user && location.pathname === baseRoutes.popularUsers
              ? baseRoutes.popularUsers
              : user
              ? baseRoutes.users
              : baseRoutes.signup
          }
          onClick={
            location.pathname === baseRoutes.users ||
            location.pathname === baseRoutes.popularUsers
              ? goBackToTop
              : undefined
          }
          exact={true}
          id='bottomNavigationIcon'
          style={{
            color: "var(--primaryDarkGrayColor)",
          }}
          activeStyle={{
            color: "var(--primaryPurpleColor)",
            textDecoration: "underline",
          }}
        >
          <div id='iconsLarge'>
            <svg id='svgIcons' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z'
              />
            </svg>
          </div>
        </NavLink>

        <NavLink
          id='bottomNavigationIconAccount'
          to={user ? baseRoutes?.userPosts(user?.username) : baseRoutes.signup}
          onClick={
            location.pathname === baseRoutes?.userPosts(user?.username)
              ? goBackToTop
              : undefined
          }
          style={{
            color: "var(--primaryDarkGrayColor)",
          }}
          activeStyle={{
            color: "var(--primaryPurpleColor)",
          }}
        >
          <svg id='svgIcons' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z'
            />
          </svg>
        </NavLink>
      </div>
    </>
  );
};

export default AuthenticatedBottomNavigationContent;
