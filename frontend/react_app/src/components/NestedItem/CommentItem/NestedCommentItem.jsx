import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectPost } from "../../../redux/post";
import GrayLine from "../../GrayLine/GrayLine";
import LikeDislike from "../../LikeDislike/LikeDislike";
import PostHeader from "../../PostHeader/PostHeader";

const NestedCommentItem = ({ commentId }) => {
  const comment = useSelector((s) => selectPost(s, commentId));
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSignupRedirect = () => {
    setShowSignupModal(true);
  };

  return (
    <>
      {comment?.id && (
        <>
          <GrayLine grayLineStyle={{ marginBottom: "0" }} />
          <PostHeader
            post={comment}
            childPost={true}
            showSignupModal={showSignupModal}
            signupRedirect={handleSignupRedirect}
          />

          <div id='postContentContainer'>
            {comment?.body && (
              <div
                style={{
                  overflow: "hidden",
                }}
              >
                <div id='postBody' style={{ overflow: "hidden" }}>
                  {comment?.body}
                </div>
              </div>
            )}
            <div
              id='postActionsContainer'
              style={{
                borderRadius: "0",
              }}
            >
              <div id='postActions'>
                <LikeDislike postId={comment?.id} type='comment' />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

NestedCommentItem.propTypes = {
  commentId: PropTypes?.string?.isRequired,
};

export default NestedCommentItem;
