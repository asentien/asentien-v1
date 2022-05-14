import React from "react";
import { useLocation } from "react-router-dom";
import LikeDislike from "../LikeDislike/LikeDislike";

import "../PostContent/PostContent.css";

import ExpandComments from "../ExpandActions/ExpandComments/ExpandComments";
import ExpandShares from "../ExpandActions/ExpandShares/ExpandShares";

const PostActions = ({
  post,
  expandedComments,
  expandedShares,
  loading,
  handleComments,
  handleShares,
  isShared,
  isNested,
  isNestedComment,
  isNestedShare,
}) => {
  const location = useLocation();
  const props = {
    post: post,
    handleComments: handleComments,
    expandedComments: expandedComments,
    loading: loading,
    isNested: isNested,
    isNestedComment: isNestedComment,
    isNestedShare: isNestedShare,
    location: location,
  };
  const commentProps = {
    handleComments: handleComments,
    expandedComments: expandedComments,
  };
  const shareProps = {
    handleShares: handleShares,
    expandedShares: expandedShares,
  };

  return (
    <>
      {!isShared && (
        <div
          id='postActionsContainer'
          style={{
            borderRadius:
              expandedShares || expandedComments || isNested ? "0" : "",
          }}
        >
          <div id='postActions'>
            <LikeDislike
              postId={post?.id}
              type={
                isNestedComment ? "comment" : isNestedShare ? "share" : "post"
              }
            />
            <ExpandComments {...props} {...commentProps} />
            <ExpandShares {...props} {...shareProps} />
          </div>
        </div>
      )}
    </>
  );
};

export default PostActions;
