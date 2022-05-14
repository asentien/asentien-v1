import React from "react";

import "./CloseButton.css";

const CloseButton = ({
  closeButtonId,
  handleClick,
  closeButtonStyle,
  iconSize,
}) => {
  return (
    <>
      <svg
        id={closeButtonId || "closeIcon"}
        type='button'
        onClick={handleClick}
        style={closeButtonStyle}
        fontSize={iconSize}
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
        />
      </svg>
    </>
  );
};

export default CloseButton;
