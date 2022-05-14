/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
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
import GrayLine from "../../GrayLine/GrayLine";
import PostActions from "../../PostActions/PostActions";

import LoadMoreButton from "../../LoadMoreButton/LoadMoreButton";
import NestedShareItem from "./NestedShareItem";
import NestedCommentItem from "../CommentItem/NestedCommentItem";
import ShareForm from "../../NestedForm/ShareForm/ShareForm";
import CommentForm from "../../NestedForm/CommentForm/CommentForm";

import "./ShareItem.css";



const ShareItem = ({
  shareId,
  expandComments,
  expandShares,
  signupRedirect,
}) => {
  const dispatch = useDispatch();
  const share = useSelector((s) => selectPost(s, shareId));
  const comments = useSelector((s) => selectComments(s, shareId));
  const shares = useSelector((s) => selectShares(s, shareId));

  const [expandedComments, setExpandedComments] = useState(expandComments);
  const [expandedShares, setExpandedShares] = useState(expandShares);

  const { fetched, loading, nextLoading } = useUI(
    key.comments(shareId),
    Boolean(expandComments),
    key.commentsNext(shareId)
  );

  const { fetchedSecondary, loadingSecondary, nextLoadingSecondary } = useUI(
    key.shares(shareId),
    Boolean(expandShares),
    key.sharesNext(shareId)
  );

  const handleComments = async () => {
    if (!fetched) {
      await dispatch(getComments(shareId));
    }
    setExpandedComments(!expandedComments);
    setExpandedShares(false);
  };

  const handleCommentsNext = () => {
    dispatch(getComments(shareId, comments?.next));
  };

  const handleShares = async () => {
    if (!fetchedSecondary) {
      await dispatch(getShares(shareId));
    }
    setExpandedShares(!expandedShares);
    setExpandedComments(false);
  };

  const handleSharesNext = () => {
    dispatch(getShares(shareId, shares?.next));
  };

  useEffect(() => {
    if (!fetched && expandComments) {
      dispatch(getComments(shareId));
    }
  }, []);

  useEffect(() => {
    if (!fetchedSecondary && expandShares) {
      dispatch(getShares(shareId));
    }
  }, []);

  return (
    <>
     
      {share?.id && (
        <>
          <GrayLine grayLineStyle={{ marginBottom: "0" }} />
          <PostHeader
            post={share}
            childPost={true}
            signupRedirect={signupRedirect}
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
            <PostActions
              isNested={true}
              isNestedShare={true}
              expandedComments={expandedComments}
              expandedShares={expandedShares}
              loading={loading}
              handleComments={handleComments}
              handleShares={handleShares}
              post={share}
            />
          
            {expandedComments && !loading && (
              <>
                <div id='nestedSharesAndCommentsLine' />
                <div id='nestedSharesAndCommentsContainer'>
                  <CommentForm postId={shareId} />
              
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
                  <ShareForm postId={shareId} />
                  
                  {shares?.results?.map((shareId) => (
                    <NestedShareItem key={shareId} shareId={shareId} />
                  ))}
                  <LoadMoreButton
                    callback={handleSharesNext}
                    loading={nextLoadingSecondary}
                    nextUrl={shares?.next}
                  />
                </div>
              </>
            )}
           
          </div>
        </>
      )}
    
    </>
  );
};

ShareItem.propTypes = {
  shareId: PropTypes?.string?.isRequired,
};

export default ShareItem;
