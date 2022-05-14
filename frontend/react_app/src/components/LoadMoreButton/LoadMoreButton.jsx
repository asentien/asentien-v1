import React from "react";
import GrayLine from "../GrayLine/GrayLine";

import "./LoadMoreButton.css";

const LoadMoreButton = ({ callback, loading, nextUrl }) => {
  return nextUrl ? (
    <center>
      <GrayLine />
      <button
        id='nextButton'
        color='primary'
        disabled={loading}
        onClick={callback}
      >
        Load more
      </button>
    </center>
  ) : null;
};

export default LoadMoreButton;
