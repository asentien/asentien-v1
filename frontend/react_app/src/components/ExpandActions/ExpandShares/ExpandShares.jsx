import React from "react";
const ExpandShares = ({
  post,
  handleShares,
  expandedShares,
  loading,
  isNested,
  location,
}) => {
  return (
    <>
      <div
        id='postShare'
        type='button'
        disabled={loading}
        onClick={handleShares}
        style={{
          color: !expandedShares
            ? "var(--primaryLightGrayColor)"
            : "var(--primaryPurpleColor)",
        }}
      >
        <div>
          <svg
            id='postActionsIcons'
            style={{
              marginRight:
                post?.share_tally === 0 ||
                location?.pathname?.startsWith("/post-") ||
                isNested
                  ? "-4px"
                  : "0px",
              height: "32px",
              width: "32px",
            }}
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12'
            />
          </svg>
        </div>
        <div
          id='postShareTally'
          style={{
            color: !expandedShares ? "black" : "var(--primaryPurpleColor)",
          }}
        >
          {post?.share_tally !== 0 && post?.share_tally}
        </div>
      </div>
    </>
  );
};

export default ExpandShares;
