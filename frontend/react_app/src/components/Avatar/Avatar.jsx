import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";

import "./Avatar.css";
import baseAvatar from "../baseAvatar.png";
import TextLink from "../TextLink/TextLink";

const Avatar = ({
  avatarLinkTo,
  avatarLinkStyle,
  avatarImageSource,
  avatarImageStyle,
  avatarImageId,
  isLink,
  avatarDivId,
  avatarDivStyle,
  handleClick,
}) => {
  const user = useSelector(selectUser);
  const baseSource = user?.profile?.avatar || baseAvatar;
  const avatarImage = (
    <img
      src={avatarImageSource || baseSource}
      id={avatarImageId || "avatar"}
      alt='A'
      loading='lazy'
      style={avatarImageStyle}
    />
  );
  return (
    <>
      {!isLink ? (
        <div onClick={handleClick} id={avatarDivId} style={avatarDivStyle}>
          {avatarImage}
        </div>
      ) : (
        <TextLink to={avatarLinkTo} textLinkStyle={avatarLinkStyle}>
          {avatarImage}
        </TextLink>
      )}
    </>
  );
};

export default Avatar;
