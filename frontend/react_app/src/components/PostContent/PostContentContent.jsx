import React, { useState } from "react";
import ReactPlayer from "react-player/file";
import PostParent from "../PostParent/PostParent";
import { isHandheldDevice } from "../../utils";

import "./PostContent.css";
import logo from "./watermarkLogo.png";
import PostActions from "../PostActions/PostActions";

const PostContentContent = ({
  post,
  expandPostBody,
  expandedComments,
  expandedShares,
  loading,
  handleComments,
  handleShares,
  handlePostBody,
  isShared,
  shouldPlay,
}) => {
  const [imageHasLoaded, setImageHasLoaded] = useState(false);
  return (
    <>
      {post?.title && (
        <div id='postTitle'>
          <strong>{post?.title}</strong>
        </div>
      )}
      {post?.content && (
        <div
          id='postContent'
          style={{
            borderTop: post?.title?.length < 1 && "none",
            borderBottom: post?.body?.length < 1 && "none",
          }}
        >
          <img src={logo} alt='logo' id='postWatermarkPicture' loading='lazy' />
          <div id='postWatermarkText'>@{post?.author?.username}</div>
          {post?.content?.toLowerCase().includes(".mp4") ||
          post?.content?.toLowerCase().includes(".mov") ? (
            <ReactPlayer
              playing={shouldPlay}
              playsinline={true}
              controls={true}
              volume={null}
              muted={true}
              url={post?.content}
              width='100%'
              height='100%'
              maxheight='248px'
              id='postContentVideo'
              loading='lazy'
              style={{ maxHeight: "248px" }}
            />
          ) : (
            <>
              <img
                src={post?.content}
                alt='Post content'
                style={{
                  maxheight: "253px",
                  height: "100%",
                  width: "100%",
                  maxWidth: "450px",
                }}
                id='postContentImage'
                loading='lazy'
                onLoad={() => setImageHasLoaded(true)}
              />
              {!imageHasLoaded && (
                <div id='loadingImageFallback'>
                  <center id='loadingImageFallbackText'>
                    Loading Image...
                  </center>
                </div>
              )}
            </>
          )}
          <img
            src={logo}
            alt='logo'
            id='postWatermarkPictureMobile'
            loading='lazy'
          />
          <div id='postWatermarkTextMobile'>@{post?.author?.username}</div>
        </div>
      )}
      {post?.body && (
        <div
          id='postBody'
          onClick={handlePostBody}
          style={{
            cursor: post?.body?.length >= 374 && !expandPostBody && "pointer",
            whiteSpace: "pre-line",
          }}
        >
          {post?.is_comment &&
            !post?.parent?.is_comment &&
            !post?.parent?.is_share && (
              <div id='postBodyCommentNotice'>
                {post?.author?.first_name} left a comment.
              </div>
            )}
          {post?.parent?.is_share && (
            <div id='postBodyCommentNotice'>
              {post?.author?.first_name}{" "}
              {post?.is_share ? "shared another" : "commented on a"} share.
            </div>
          )}
          {post?.parent?.is_comment && (
            <div id='postBodyCommentNotice'>
              {post?.author?.first_name}{" "}
              {post?.is_share ? "shared a" : "commented on another"} comment.
            </div>
          )}
          {post?.body?.length >= 374 && !expandPostBody ? (
            <>
              {post?.body?.substring(0, 374)}
              <div id='postBodyEffect2' />
              <div id='postBodyEffect' />
            </>
          ) : (
            post?.body
          )}
        </div>
      )}
      {post?.parent && (
        <>
          <PostParent post={post?.parent} />
        </>
      )}
      <PostActions
        expandedComments={expandedComments}
        expandedShares={expandedShares}
        loading={loading}
        handleComments={handleComments}
        handleShares={handleShares}
        post={post}
        isShared={isShared}
      />
    </>
  );
};

export default PostContentContent;
