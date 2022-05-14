import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import NavigationDropdownContent from "./NavigationDropdownContent";

import "./NavigationDropdown.css";

const NavigationDropdown = ({
  onClose,
  handleOpenSignupModal,
  handleOpenLoginModal,
  handleOpenContactModal,
  navigationDisplayNone,
}) => {
  return (
    <>
      <Dropdown
        navigation
        navigationDisplayNone={navigationDisplayNone}
        linkTitle={"Navigation"}
        onClose={onClose}
        render={
         
          <NavigationDropdownContent
            onClose={onClose}
            handleOpenSignupModal={handleOpenSignupModal}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenContactModal={handleOpenContactModal}
            navigationDisplayNone={navigationDisplayNone}
          />
      
        }
      />
    </>
  );
};

export default NavigationDropdown;
