import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, logoutUser } from "../../redux/user";
import { baseRoutes } from "../../routes";
import Avatar from "../Avatar/Avatar";
import TextLink from "../TextLink/TextLink";

import "./NavigationDropdown.css";

const NavigationDropdownContent = ({
  onClose,
  handleOpenSignupModal,
  handleOpenLoginModal,
  handleOpenContactModal,
}) => {
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutUser());
    <Redirect to={baseRoutes.index} />;
    onClose();
  };

  return (
    <>
      <>
        <TextLink
          to={user ? baseRoutes.userPosts(user?.username) : "#"}
          handleClick={!user ? handleOpenSignupModal : onClose}
          textLinkId={"navigationDropdownProfile"}
        >
          <Avatar isLink={false} avatarImageId={"dropdownAvatar"} />
          <div id='dropdownName'>
            <div id='dropdownNameLink'>
              {user ? (
                <>
                  {user?.first_name} {user?.last_name}
                </>
              ) : (
                "Asentien"
              )}
            </div>
            <div id='dropdownProfileText'>
              <div id='dropdownProfileTextLink'>
                {user ? "View Profile." : "Create Profile"}
              </div>
            </div>
          </div>
        </TextLink>

        <div id='navigationItemsMenu'>
          <TextLink
            to={baseRoutes.faq}
            handleClick={onClose}
            textLinkId={"navigationItems"}
          >
            <div id='navigationItemsLink'>
              F.A.Q. Asentien
              <svg id='topNavNavigationDropdownArrow' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
                />
              </svg>
            </div>
          </TextLink>
          {user && (
            <>
              <TextLink
                to={baseRoutes.settings}
                handleClick={onClose}
                textLinkId={"navigationItems"}
              >
                <div id='navigationItemsLink'>
                  Settings
                  <svg id='topNavNavigationDropdownArrow' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
                    />
                  </svg>
                </div>
              </TextLink>
              <TextLink
                to={baseRoutes.privacyAndTerms}
                textLinkId={"navigationItems"}
                handleClick={onClose}
              >
                <div id='navigationItemsLink'>
                  Privacy & Terms
                  <svg id='topNavNavigationDropdownArrow' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
                    />
                  </svg>
                </div>
              </TextLink>
            </>
          )}
          {!user && (
            <>
              <TextLink
                to={baseRoutes.terms}
                handleClick={onClose}
                textLinkId={"navigationItems"}
              >
                <div id='navigationItemsLink'>
                  Usage Terms
                  <svg id='topNavNavigationDropdownArrow' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
                    />
                  </svg>
                </div>
              </TextLink>
              <TextLink
                to={baseRoutes.privacy}
                handleClick={onClose}
                textLinkId={"navigationItems"}
              >
                <div id='navigationItemsLink'>
                  Privacy Policy
                  <svg id='topNavNavigationDropdownArrow' viewBox='0 0 24 24'>
                    <path
                      fill='currentColor'
                      d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
                    />
                  </svg>
                </div>
              </TextLink>
            </>
          )}
          {user ? (
            <>
              <TextLink
                to={"#"}
                handleClick={handleOpenContactModal}
                textLinkId={"navigationItems"}
                type='button'
              >
                <div id='navigationItemsLink'>Contact Us</div>
              </TextLink>
              <TextLink
                to={baseRoutes.index}
                handleClick={handleLogout}
                textLinkId={"navigationItems"}
                type='button'
              >
                <div id='navigationItemsLink'>Log Out</div>
              </TextLink>
            </>
          ) : (
            <>
              <TextLink
                to={"#"}
                handleClick={handleOpenLoginModal}
                textLinkId={"navigationItems"}
                type='button'
              >
                <div id='navigationItemsLink'>Log In</div>
              </TextLink>
              <TextLink
                to={"#"}
                handleClick={handleOpenSignupModal}
                textLinkId={"navigationItems"}
                type='button'
              >
                <div id='navigationItemsLink'>Sign Up</div>
              </TextLink>
            </>
          )}

          <div id='navigationCopyright' type='button'>
            &copy; Willy Nilsson 2021. All rights reserved.
          </div>
        </div>
      </>
    </>
  );
};

export default NavigationDropdownContent;
