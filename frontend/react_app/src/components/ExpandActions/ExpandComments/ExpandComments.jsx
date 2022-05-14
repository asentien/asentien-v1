import React from "react";
import "../ExpandActions.css";

const ExpandComments = ({
  post,
  handleComments,
  expandedComments,
  loading,
  isNested,
  location,
}) => {
  return (
    <>
      <div
        id='postComments'
        type='button'
        disabled={loading}
        onClick={handleComments}
        style={{
          color: !expandedComments
            ? "var(--primaryLightGrayColor)"
            : "var(--primaryPurpleColor)",
        }}
      >
        <div>
          <svg
            id='postActionsIcons'
            style={{
              marginRight:
                post?.comment_tally === 0 ||
                location?.pathname?.startsWith("/post-") ||
                isNested
                  ? "-3px"
                  : "0px",
              height: "28px",
              width: "28px",
              paddingRight:
                post?.comment_tally === 0 ||
                location?.pathname?.startsWith("/post-")
                  ? "0"
                  : "",
            }}
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z'
            />
          </svg>
        </div>
        <div
          id='postCommentTally'
          style={{
            color: !expandedComments ? "black" : "var(--primaryPurpleColor)",
          }}
        >
          {post?.comment_tally !== 0 && post?.comment_tally}
        </div>
      </div>
    </>
  );
};

export default ExpandComments;
