import React from "react";
import { Waypoint } from "react-waypoint";
import LoadingUserList from "../Loading/LoadingUserList";
import CloseButton from "../CloseButton/CloseButton";

import "./LikesItem.css";
import GrayLine from "../GrayLine/GrayLine";

const LikesItemModal = ({
  fetched,
  loading,
  postLikesNext,
  handleNext,
  nextLoading,
  render,
  onClose,
}) => {
  return (
    <>
      <div>
        <strong id='postLikesTitle'>Post Likes</strong>
        <CloseButton
          handleClick={onClose}
          closeButtonStyle={{
            float: "right",
            marginTop: "0px",
            height: "24px",
            width: "24px",
          }}
        />
      </div>

      <GrayLine grayLineStyle={{ marginTop: "5px" }} />
      {render}
      {fetched && postLikesNext && (
        <Waypoint
          onEnter={handleNext}
          loading={nextLoading}
          nextUrl={postLikesNext}
        >
          <div>
            <LoadingUserList isMinified={true} />
          </div>
        </Waypoint>
      )}
    </>
  );
};

export default LikesItemModal;
