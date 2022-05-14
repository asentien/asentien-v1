import React from "react";

import "./UnauthenticatedBottomNavigationContent.css";

const UnAuthenticatedBottomNavigationContent = ({
  handleOpenSignupModal,
  handleOpenLoginModal,
}) => {
  return (
    <>
      <div id='bottomNavLinks'>
        <button id='bottomNavSignupButton' onClick={handleOpenSignupModal}>
          Sign Up
        </button>
        <button id='bottomNavLoginButton' onClick={handleOpenLoginModal}>
          Log In
        </button>
      </div>
    </>
  );
};

export default UnAuthenticatedBottomNavigationContent;
