/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/user";
import {
  getPostLikes,
  key,
  selectPostLikes,
  selectPost,
} from "../../redux/post";
import useUI from "../../hooks/useUI";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import LoadingUserList from "../Loading/LoadingUserList";
import UserList from "../UserList/UserList";
import PrimaryModal from "../Modals/PrimaryModal";
import LikesItemModal from "./LikesItemModal";

import "./LikesItem.css";

const LikesItem = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const post = useSelector((s) => selectPost(s, postId));

  const postLikes = useSelector((s) => selectPostLikes(s, postId));

  const { fetched, loading, nextLoading } = useUI(
    key?.postLikes(postId),
    key?.postLikesNext(postId)
  );

  const handleNext = () => {
    if (user) {
      dispatch(getPostLikes(postId, postLikes?.next));
    }
  };

  const render = () => {
    let rendered;
    if (!user) {
      rendered = (
        <div id='noDataModals'>
          Create a free account or log in to view who has liked this post.
        </div>
      );
    } else if (loading) {
      rendered = <LoadingUserList isMinified={true} />;
    } else if (postLikes?.results?.length) {
      rendered = (
        <UserList
          hasNoBaseUrl={true}
          isMinified={true}
          list={postLikes?.results}
        />
      );
    } else {
      rendered = (
        <div id='noDataModals'>
          No one has{" "}
          <strong
            style={{
              color: "var(--primaryPurpleColor)",
            }}
          >
            liked
          </strong>{" "}
          this post.
          <br /> Go ahead and start it off.
        </div>
      );
    }
    return rendered;
  };

  const renderCombinedTally = () => {
    const likes = post?.likes?.length;
    const dislikes = post?.dislikes?.length;
    const combinedTally = likes - dislikes;
    let result;
    if (
      (likes === 0 || likes === undefined) &&
      (dislikes === 0 || dislikes === undefined)
    ) {
      result = "Like";
    } else {
      result = `${combinedTally}`;
    }
    return result;
  };

  const [postLikesModal, setPostLikesModal] = useState(false);

  const handleOpenPostLikesModal = () => {
    if (user) {
      setPostLikesModal(true);
    }
  };

  const handleClosePostLikesModal = () => {
    setPostLikesModal(false);
  };

  const ref = useRef();
  useOnClickOutside(ref, handleClosePostLikesModal);

  useEffect(() => {
    if (!fetched && user && postLikesModal) {
      dispatch(getPostLikes(postId));
    }
  }, [postLikesModal]);

  return (
    <>
      <div
        onClick={
          renderCombinedTally() !== "Like"
            ? handleOpenPostLikesModal
            : undefined
        }
        id='voteCountRender'
        style={{
          fontSize: renderCombinedTally() === "Like" && "0.7rem",
          textDecoration: renderCombinedTally() === "Like" && "none",
          cursor: renderCombinedTally() === "Like" && "default",
        }}
      >
        {renderCombinedTally()}
      </div>

      {postLikesModal && (
        <>
          <PrimaryModal modalRef={ref}>
          
            <LikesItemModal
              onClose={handleClosePostLikesModal}
              fetched={fetched}
              loading={loading}
              nextLoading={nextLoading}
              postLikesNext={postLikes?.next}
              render={render()}
              handleNext={handleNext}
            />
           
          </PrimaryModal>
        </>
      )}
    </>
  );
};

export default LikesItem;
