import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectPost } from "../../../redux/post";
import GrayLine from "../../GrayLine/GrayLine";
import LikeDislike from "../../LikeDislike/LikeDislike";
import PostHeader from "../../PostHeader/PostHeader";

import "./ShareItem.css";

const NestedShareItem = ({ shareId }) => {
  const share = useSelector((s) => selectPost(s, shareId));
  const [showSignupModal, setShowSignupModal] = useState(false);
  const handleSignupRedirect = () => {
    setShowSignupModal(true);
  };

  return (
    <>
      {share?.id && (
        <>
          <GrayLine grayLineStyle={{ marginBottom: "0" }} />
          <PostHeader
            post={share}
            childPost={true}
            showSignupModal={showSignupModal}
            signupRedirect={handleSignupRedirect}
          />
          {share?.body?.trim().length === 0 && (
            <div id='upperShareItemNoBody' />
          )}
          <div id='postContentContainer'>
            {share?.body?.trim().length !== 0 && (
              <div
                id='postBody'
                style={{
                  overflow: "hidden",
                  margin: share?.body?.trim().length === 0 && "0px",
                }}
              >
                {share?.body}
              </div>
            )}
            {share?.body?.trim().length === 0 && (
              <div id='lowerShareItemNoBody' />
            )}
            <div
              id='postActionsContainer'
              style={{
                borderRadius: "0",
              }}
            >
              <div id='postActions'>
                <LikeDislike postId={share?.id} type='share' />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

NestedShareItem.propTypes = {
  shareId: PropTypes?.string?.isRequired,
};

export default NestedShareItem;
