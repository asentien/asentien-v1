import React from "react";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import SecondaryModal from "../Modals/SecondaryModal";

import "./AsentientAcceleratorNotification.css";

const AcceleratorsNotificationsModal = ({ notification }) => {
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
        You've been promoted to <strong id='purpleColor'>Accelerator</strong>{" "}
        status.
        <br />
        <br />
        Because we have seen what you've already done to help us deliver
        internet's promise and make the internet what it ought to be.
        <br />
        Thank you.
        <br />
        <br />
        As an Accelerator we expect you to continue acting responsibly. You're
        not allowed to promote other users in exchange for gifts, services, or
        other forms of favors. Promoting people should be done to further our
        mission. We look forward to seeing what else you can accomplish in the
        future.
        <br />
        <br />
        All you need to do now, to begin promoting other users to Asentient
        status, is to refresh the page.
        <div id='refreshTitle' onClick={refreshPage}>
          Refresh the page
        </div>
      </SecondaryModal>
    </>
  );
};

export default AcceleratorsNotificationsModal;
