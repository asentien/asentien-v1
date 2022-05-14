import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import PostFormModal from "./PostFormModal";
import AsentientInfoModal from "../AsentientInfoModal/AsentientInfoModal";

import "./styles/PostForm.css";

import Avatar from "../Avatar/Avatar";
import { baseRoutes } from "../../routes";

const PostForm = () => {
  const location = useLocation();

  const user = useSelector(selectUser);

  const [postFormModal, setPostFormModal] = useState(false);

  const handleOpenPostFormModal = () => {
    setPostFormModal(true);
  };

  const handleClosePostFormModal = () => {
    setPostFormModal(false);
  };

  return (
    <>
      <div
        id='postFormBaseContainer'
        type='button'
        onClick={handleOpenPostFormModal}
        style={{
          marginTop:
            location.pathname === baseRoutes.userPosts(user?.username) &&
            "17.5px",
        }}
      >
        <Avatar isLink={false} avatarImageStyle={{ marginTop: "14px" }} />
        <div id='postFormBaseBody'>Deliver internet's promise</div>
      </div>
      {postFormModal && user?.is_asentient ? (
        <PostFormModal onClose={handleClosePostFormModal} />
      ) : (
        postFormModal &&
        user && <AsentientInfoModal onClose={handleClosePostFormModal} />
      )}
    </>
  );
};
export default PostForm;
