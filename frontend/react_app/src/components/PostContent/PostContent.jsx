import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import PostContentContent from "./PostContentContent";

import "./PostContent.css";

const PostContent = ({
  post,
  expandPostBody,
  expandedComments,
  expandedShares,
  loading,
  handleComments,
  handleShares,
  handlePostBody,
  isShared,
}) => {
  const [shouldPlay, updatePlayState] = useState(false);

  const handleEnterViewport = () => {
    updatePlayState(true);
  };
  const handleExitViewport = () => {
    updatePlayState(false);
  };

  return (
    <Waypoint
      topOffset='25%'
      bottomOffset='50%'
      onEnter={handleEnterViewport}
      onLeave={handleExitViewport}
    >
      <div id='postContentContainer'>
        <PostContentContent
          expandedComments={expandedComments}
          expandedShares={expandedShares}
          expandPostBody={expandPostBody}
          loading={loading}
          handleComments={handleComments}
          handleShares={handleShares}
          handlePostBody={handlePostBody}
          post={post}
          isShared={isShared}
          shouldPlay={shouldPlay}
        />
      </div>
    </Waypoint>
  );
};

export default PostContent;
