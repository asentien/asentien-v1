import React from "react";

import "./BaseContainer.css";

const BaseContainer = ({
  isProfile,
  isProfileLoader,
  isSpecialPage,
  children,
  isInfoPages,
}) => {
  return (
    <>
      <div id='baseParentContainer'>
        <div id='baseContainer' style={{ height: isProfileLoader && "257px" }}>
          {isProfile ? (
            <div id='profileContainerHeader'>{children}</div>
          ) : isSpecialPage ? (
            <>{children}</>
          ) : (
            <div
              id='pageHeading'
              style={{
                marginLeft: isInfoPages && "20px",
                marginRight: isInfoPages && "20px",
              }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default BaseContainer;
