import React, { useRef } from "react";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";

import "./AsentientInfoModal.css";
import SecondaryModal from "../Modals/SecondaryModal";

const AsentientInfoModal = ({ onClose }) => {
  const ref = useRef();
  useOnClickOutside(ref, onClose);
  useLockBodyScroll();

  return (
    <>
      <SecondaryModal modalRef={ref}>
        <div id='asentientInfoTitle'>Asentients and Accelerators</div>
        <div id='asentientInfoTextContainer'>
          With an Asentien account you're able to like and dislike, comment on,
          and share posts. <br />
          <br /> But to create original posts, you must first become an{" "}
          <strong id='asentientInfoTextBold'>Asentient</strong> or an{" "}
          <strong id='asentientInfoTextBold'>Accelerator</strong>.
          <br />
          <br />
          Become one by sharing interesting posts, contributing insightful
          comments, liking and disliking created content, following fascinating
          people, and by styling your profile.
        </div>

        <div id='asentientInfoButton' onClick={onClose}>
          Keep up, Keep going!
        </div>
      </SecondaryModal>
    </>
  );
};

export default AsentientInfoModal;
