import React, { useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

import "../styles/DeactivateModal.css";
import "../../Modals/styles/Modals.css";

const DeactivateModaL = ({
  deactivateUser,
  post,
  user,
  deactivatePostText,
  onClose,
  handleDeactivate,
}) => {
  const ref = useRef();

  useOnClickOutside(ref, onClose);

  const deactivateModalContent = (
    <>
      <div id='deactivatePostTitle'>Deactivate?</div>

      <div id='deactivatePostText'>{deactivatePostText}</div>

      <div
        id='deactivateButtonsContainer'
        style={{
          marginBottom: post?.author?.username !== user?.username && "10px",
        }}
      >
        <div id='cancelPostDropdownButton' onClick={onClose}>
          Cancel
        </div>
        <div id='deactivatePostDropdownButton' onClick={handleDeactivate}>
          Deactivate
        </div>
      </div>
    </>
  );

  return (
    <>
      {deactivateUser ? (
        <>{deactivateModalContent}</>
      ) : (
        <>
          <div
            id='deactivatePostModal'
            style={{
              marginTop:
                post?.author?.username !== user?.username ? "47px" : "60px",
              width: deactivateUser && "300px",
            }}
            ref={ref}
          >
            {deactivateModalContent}
          </div>
        </>
      )}
    </>
  );
};

export default DeactivateModaL;
