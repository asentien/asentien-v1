/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import {
  getComments,
  getShares,
  key,
  selectPost,
  selectComments,
  selectShares,
} from "../../redux/post";
import useUI from "../../hooks/useUI";
import SignupForm from "../Unauthenticated/SignupForm/SignupForm";
import PostHeader from "../PostHeader/PostHeader";
import PostContent from "../PostContent/PostContent";
import BaseItem from "../BaseItem/BaseItem";


import ShareItem from "../NestedItem/ShareItem/ShareItem";
import CommentItem from "../NestedItem/CommentItem/CommentItem";
import ShareForm from "../NestedForm/ShareForm/ShareForm";
import CommentForm from "../NestedForm/CommentForm/CommentForm";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import GrayLine from "../GrayLine/GrayLine";

const PostItem = ({ expandComments, expandShares, expandPostBody, postId }) => {
  const dispatch = useDispatch();

  const location = useLocation();

  const post = useSelector((s) => selectPost(s, postId));
  const comments = useSelector((s) => selectComments(s, postId));
  const shares = useSelector((s) => selectShares(s, postId));
  const [expandedComments, setExpandedComments] = useState(expandComments);
  const [expandedShares, setExpandedShares] = useState(expandShares);
  const [expandedPostBody, setExpandedPostBody] = useState(expandPostBody);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const user = useSelector(selectUser);

  const handleSignupRedirect = () => {
    setShowSignupModal(true);
  };

  const handleSignupRedirectClose = () => {
    setShowSignupModal(false);
  };

  const { fetched, loading, nextLoading } = useUI(
    key.comments(postId),
    Boolean(expandedComments),
    key.commentsNext(postId)
  );

  const { fetchedSecondary, loadingSecondary, nextLoadingSecondary } = useUI(
    key.shares(postId),
    Boolean(expandShares),
    key.sharesNext(postId)
  );

  useEffect(() => {
    if (!fetched && expandComments) {
      dispatch(getComments(postId));
    }
  }, []);

  useEffect(() => {
    if (!fetchedSecondary && expandShares) {
      dispatch(getShares(postId));
    }
  }, []);

  const handlePostBody = async () => {
    setExpandedPostBody(!expandPostBody);
  };

  const handleComments = async () => {
    if (!fetched) {
      await dispatch(getComments(postId));
    }
    setExpandedComments(!expandedComments);
    setExpandedShares(false);
  };

  const handleCommentsNext = () => {
    dispatch(getComments(postId, comments?.next));
  };

  const handleShares = async () => {
    if (!fetchedSecondary) {
      await dispatch(getShares(postId));
    }
    setExpandedShares(!expandedShares);
    setExpandedComments(false);
  };

  const handleSharesNext = () => {
    dispatch(getShares(postId, shares?.next));
  };

  return (
    <>
      <BaseItem
        isPostItem
        detail={location?.pathname?.startsWith("/post-") && true}
      >
        <PostHeader
          post={post}
          childPost={false}
          showSignupModal={showSignupModal}
          signupRedirect={handleSignupRedirect}
          isShared={false}
        />
        <PostContent
          post={post}
          expandPostBody={expandedPostBody}
          expandedComments={expandedComments}
          expandedShares={expandedShares}
          loading={loading}
          handleComments={handleComments}
          handleShares={handleShares}
          handlePostBody={handlePostBody}
          isShared={false}
        />

     
          {expandedComments && !loading && (
            <>
              <GrayLine grayLineStyle={{ marginBottom: "0" }} />
              <CommentForm postId={postId} />
              
                {comments?.results?.map((commentId) => (
                  <CommentItem key={commentId} commentId={commentId} />
                ))}
              
              {!location?.pathname?.startsWith("/post-") && (
                <LoadMoreButton
                  callback={handleCommentsNext}
                  loading={nextLoading}
                  nextUrl={comments?.next}
                />
              )}
            </>
          )}
          {expandedShares && !loadingSecondary && (
            <>
              <GrayLine grayLineStyle={{ marginBottom: "0" }} />
              <ShareForm postId={postId} />
              
                {shares?.results?.map((shareId) => (
                  <ShareItem key={shareId} shareId={shareId} />
                ))}
              
              {!location?.pathname?.startsWith("/post-") && (
                <LoadMoreButton
                  callback={handleSharesNext}
                  loading={nextLoadingSecondary}
                  nextUrl={shares?.next}
                />
              )}
            </>
          )}
        
      </BaseItem>

      {!user && showSignupModal && (
        <SignupForm onClose={handleSignupRedirectClose} />
      )}

      {location?.pathname?.startsWith("/post-") &&
        fetched &&
        !loading &&
        expandedComments &&
        comments?.next &&
        !nextLoading && (
          <Waypoint
            onEnter={handleCommentsNext}
            loading={nextLoading}
            nextUrl={comments?.next}
          >
            <div />
          </Waypoint>
        )}
      {location?.pathname?.startsWith("/post-") &&
        fetchedSecondary &&
        !loadingSecondary &&
        expandedShares &&
        shares?.next &&
        !nextLoadingSecondary && (
          <Waypoint
            onEnter={handleCommentsNext}
            loading={nextLoadingSecondary}
            nextUrl={shares?.next}
          >
            <div />
          </Waypoint>
        )}
    </>
  );
};
export default PostItem;
