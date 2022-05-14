import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import CloseButton from "../CloseButton/CloseButton";

import "./Dropdown.css";
import GrayLine from "../GrayLine/GrayLine";
import TextLink from "../TextLink/TextLink";

const Dropdown = ({
  onClose,
  search,
  searchDisplayNone,
  notification,
  notificationDisplayNone,
  navigation,
  navigationDisplayNone,
  linkTitle,
  render,
}) => {
  const ref = useRef();
  useOnClickOutside(ref, onClose);
  return (
    <>
      <div
        id='dropdownContainer'
        ref={ref}
        style={{
          display:
            searchDisplayNone ||
            notificationDisplayNone ||
            navigationDisplayNone
              ? "none"
              : !search
              ? "block"
              : "",
        }}
      >
        <div id='dropdownTitle'>
          <TextLink
            to={search ? "/users" : notification ? "/notifications" : "#"}
            handleClick={!navigation ? onClose : undefined}
            textLinkId={"textLinkSecondaryId"}
            textLinkStyle={{ cursor: navigation && "default" }}
          >
            {linkTitle}
            {!navigation && (
              <svg id='arrowIcon' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z'
                />
              </svg>
            )}
          </TextLink>
          <CloseButton
            handleClick={onClose}
            closeButtonStyle={{ height: "20px", width: "20px" }}
          />
        </div>
        <GrayLine grayLineStyle={{ marginBottom: "-5px" }} />
        {render}
      </div>
    </>
  );
};

export default Dropdown;
