import PropTypes from "prop-types";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/user";
import {
  removePost,
  removeComment,
  removeShare,
  selectPost,
} from "../../../redux/post";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import TextLink from "../../TextLink/TextLink";
import DeactivateModaL from "../DeactivateModal/DeactivateModal";

import "../styles/DeactivatePost.css";


const DeactivatePost = (props) => {
  const { postId, type } = props;
  const ref = useRef();
  const dispatch = useDispatch();
  const post = useSelector((s) => selectPost(s, postId));
  const user = useSelector(selectUser);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDeactivate = async () => {
    if (type === "post") {
      await dispatch(removePost(postId, post?.author?.username));
    }
    if (type === "comment") {
      await dispatch(removeComment(postId, post?.parent?.id));
    }
    if (type === "share") {
      await dispatch(removeShare(postId, post?.parent?.id));
    }
  };

  useOnClickOutside(ref, handleClose);

  const deactivatePostText = (
    <>
      {post?.author?.username !== user?.username ? (
        <>
          As an accelerator you're able to deactivate posts by{" "}
          <i>non-Asentients</i> that you believe break our site wide rules. e.g.
          posts that contains hate speech or pornographic or copyrighted
          material. Not posts you simply disagree with.
        </>
      ) : (
        <>
          By pressing deactivate, you remove the item itself, you remove it from
          your account, and you remove it from yours and others feeds.
        </>
      )}
    </>
  );

  return (
    <>
      <TextLink
        to={"#"}
        handleClick={handleOpen}
        textLinkId={"postDropdownLink"}
        textLinkStyle={{
          paddingRight:
            post?.author?.username !== user?.username ? "56px" : "76px",
        }}
      >
        <svg id='postDropdownIcons' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'
          />
        </svg>
        {post?.author?.username !== user?.username ? (
          <>Deactivate</>
        ) : (
          <>Deactivate</>
        )}
      </TextLink>

      {dialogOpen && (
        <DeactivateModaL
          post={post}
          dataType={post?.author}
          user={user}
          deactivatePostText={deactivatePostText}
          onClose={handleClose}
          handleDeactivate={handleDeactivate}
        />
      )}
    </>
  );
};

DeactivatePost.propTypes = {
  postId: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["post", "comment", "share"]).isRequired,
};

export default DeactivatePost;
