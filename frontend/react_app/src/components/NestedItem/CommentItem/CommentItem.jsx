/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  getShares,
  key,
  selectPost,
  selectComments,
  selectShares,
} from "../../../redux/post";
import useUI from "../../../hooks/useUI";
import PostHeader from "../../PostHeader/PostHeader";

import LoadMoreButton from "../../LoadMoreButton/LoadMoreButton";
import NestedShareItem from "../ShareItem/NestedShareItem";
import NestedCommentItem from "./NestedCommentItem";
import ShareForm from "../../NestedForm/ShareForm/ShareForm";
import CommentForm from "../../NestedForm/CommentForm/CommentForm";
import PostActions from "../../PostActions/PostActions";

import GrayLine from "../../GrayLine/GrayLine";



const CommentItem = ({
  commentId,
  expandComments,
  expandShares,
  signupRedirect,
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const comment = useSelector((s) => selectPost(s, commentId));
  const comments = useSelector((s) => selectComments(s, commentId));
  const shares = useSelector((s) => selectShares(s, commentId));

  const [expandedComments, setExpandedComments] = useState(expandComments);
  const [expandedShares, setExpandedShares] = useState(expandShares);

  const { fetched, loading, nextLoading } = useUI(
    key.comments(commentId),
    Boolean(expandComments),
    key.commentsNext(commentId)
  );

  const { fetchedSecondary, loadingSecondary, nextLoadingSecondary } = useUI(
    key.shares(commentId),
    Boolean(expandShares),
    key.sharesNext(commentId)
  );

  const handleComments = async () => {
    if (!fetched) {
      await dispatch(getComments(commentId));
    }
    setExpandedComments(!expandedComments);
    setExpandedShares(false);
  };

  const handleCommentsNext = () => {
    dispatch(getComments(commentId, comments?.next));
  };

  const handleShares = async () => {
    if (!fetchedSecondary) {
      await dispatch(getShares(commentId));
    }
    setExpandedShares(!expandedShares);
    setExpandedComments(false);
  };

  const handleSharesNext = () => {
    dispatch(getShares(commentId, shares?.next));
  };

  useEffect(() => {
    if (!fetched && expandComments) {
      dispatch(getComments(commentId));
    }
  }, []);

  useEffect(() => {
    if (!fetchedSecondary && expandShares) {
      dispatch(getShares(commentId));
    }
  }, []);

  return (
    <>

      {comment?.id && (
        <>
          <GrayLine grayLineStyle={{ marginBottom: "0px" }} />
          <PostHeader
            post={comment}
            childPost={true}
            signupRedirect={signupRedirect}
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

            <PostActions
              isNested={true}
              isNestedComment={true}
              expandedComments={expandedComments}
              expandedShares={expandedShares}
              loading={loading}
              handleComments={handleComments}
              handleShares={handleShares}
              post={comment}
            />
            {expandedComments && !loading && (
              <>
                <div id='nestedSharesAndCommentsLine' />
                <div id='nestedSharesAndCommentsContainer'>
                  <CommentForm postId={commentId} />
                  {comments?.results?.map((commentId) => (
                    <NestedCommentItem key={commentId} commentId={commentId} />
                  ))}
                  <LoadMoreButton
                    callback={handleCommentsNext}
                    loading={nextLoading}
                    nextUrl={comments?.next}
                  />
                </div>
              </>
            )}
            {expandedShares && !loadingSecondary && (
              <>
                <div id='nestedSharesAndCommentsLine' />
                <div id='nestedSharesAndCommentsContainer'>
                  <ShareForm postId={commentId} />
                 
                  {shares?.results?.map((shareId) => (
                    <NestedShareItem key={shareId} shareId={shareId} />
                  ))}
                 
                  {!location?.pathname?.startsWith("/post-") && (
                    <LoadMoreButton
                      callback={handleSharesNext}
                      loading={nextLoadingSecondary}
                      nextUrl={shares?.next}
                    />
                  )}
                </div>
              </>
            )}
          
          </div>
        </>
      )}
    
    </>
  );
};

CommentItem.propTypes = {
  commentId: PropTypes?.string?.isRequired,
};

export default CommentItem;
