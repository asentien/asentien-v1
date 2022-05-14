import React from "react";
import { Link } from "react-router-dom";

import "./TextLink.css";

const TextLink = ({ to, handleClick, textLinkId, textLinkStyle, children }) => {
  return (
    <>
      <Link
        to={to}
        onClick={handleClick}
        id={textLinkId || "textLinkPrimaryId"}
        style={textLinkStyle}
      >
        {children}
      </Link>
    </>
  );
};

export default TextLink;
