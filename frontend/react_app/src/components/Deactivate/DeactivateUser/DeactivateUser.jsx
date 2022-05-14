import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deactivate, selectUser, logout } from "../../../redux/user";

import "../styles/DeactivateUser.css";
import DeactivateUserModal from "./DeactivateUserModal";

const DeactivateUser = ({ user, profileUser, isProfile, isDropdown }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDeactivate = () => {
    if (stateUser === user?.username) {
      dispatch(deactivate(user?.username));
      dispatch(logout());
      localStorage.clear();
      setTimeout(window.location.reload(), 1000);
    } else {
      dispatch(deactivate(user?.username));
      history.goBack();
    }
  };

  const deactivatePostText = (
    <>
      {stateUser?.username !== user?.username ? (
        <>
          As an Accelerator you're able to deactivate <i>non-Asentient</i> users
          that you believe have broken our site wide rules by posting e.g.
          pictures or posts that contains hate speech or pornographic or
          copyrighted material. Not users you simply disagree with.
        </>
      ) : (
        <>
          If you wish to deactivate your account you can do so here. By pressing
          deactivate, we'll deactivate your account, your posts, your comments
          and shares, as well as your likes and dislikes.
        </>
      )}
    </>
  );

  return (
    <>
      <div
        style={{
          margin: !isDropdown && "0",
          marginLeft: isDropdown ? "-8px" : "0",
        }}
        onClick={handleOpen}
      >
        <div
          style={{
            fontWeight: !isDropdown && "600",
            cursor: "pointer",
            fontSize: isDropdown && "0.6rem",
          }}
        >
          {isProfile && (
            <svg id='deactivateUserIcon' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z'
              />
            </svg>
          )}
          {stateUser?.username !== user?.username ? (
            <>Deactivate</>
          ) : (
            <>
              <div id='deactivateUserAccountButton'>Deactivate</div>
            </>
          )}
        </div>
      </div>
      {dialogOpen && (
        <>
          <DeactivateUserModal
            deactivateUser={true}
            dataType={
              profileUser?.username
                ? profileUser?.username
                : stateUser?.username
            }
            user={user}
            deactivatePostText={deactivatePostText}
            onClose={handleClose}
            handleDeactivate={handleDeactivate}
            stateUser={stateUser}
          />
        </>
      )}
    </>
  );
};

export default DeactivateUser;
