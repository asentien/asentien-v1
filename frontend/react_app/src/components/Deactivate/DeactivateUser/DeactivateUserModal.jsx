import React, { useRef } from "react";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import SecondaryModal from "../../Modals/SecondaryModal";
import DeactivateModaL from "../DeactivateModal/DeactivateModal";

import "../styles/DeactivateUser.css";

const DeactivateUserModal = ({
  deactivateUser,
  profileUser,
  stateUser,
  user,
  deactivatePostText,
  onClose,
  handleDeactivate,
}) => {
  const ref = useRef();

  useLockBodyScroll();
  useOnClickOutside(ref, onClose);

  return (
    <>
      <SecondaryModal modalRef={ref}>
        <DeactivateModaL
          deactivateUser={deactivateUser}
          dataType={
            profileUser?.username ? profileUser?.username : stateUser?.username
          }
          user={user}
          deactivatePostText={deactivatePostText}
          onClose={onClose}
          handleDeactivate={handleDeactivate}
        />
      </SecondaryModal>
    </>
  );
};

export default DeactivateUserModal;
