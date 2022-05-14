import React from "react";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import SecondaryModal from "../Modals/SecondaryModal";

import "./AsentientAcceleratorNotification.css";

const AsentientNotificationsModal = ({ notification }) => {
  const refreshPage = () => {
    window.location.reload();
  };

  useLockBodyScroll();

  return (
    <>
      <SecondaryModal>
        <div id='congratulationsTitle'>
          Congratulations {notification?.first_name}!
        </div>
        You've been promoted to <strong id='purpleColor'>Asentient</strong>{" "}
        status by one of our Accelerators.
        <br />
        <br />
        Because they believe you can help us deliver internet's promise and make
        the internet what it ought to be.
        <br />
        {!notification?.is_accelerator && (
          <>
            <br />
            Live up to that belief and you'll have the opportunity to become an
            Accelerator yourself. Allowing you to promote those users you
            believe deserve it.
            <br />
          </>
        )}
        <br />
        All you need to do now, to begin creating original posts, is to refresh
        the page.
        <div id='refreshTitle' onClick={refreshPage}>
          Refresh the page
        </div>
      </SecondaryModal>
    </>
  );
};

export default AsentientNotificationsModal;
