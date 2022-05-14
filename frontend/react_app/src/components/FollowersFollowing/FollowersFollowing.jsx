import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import FollowersFollowingNavigation from "./FollowersFollowingNavigation/FollowersFollowingNavigation";
import FollowersContent from "./FollowersContent/FollowersContent";
import FollowingContent from "./FollowingContent/FollowingContent";
import PrimaryModal from "../Modals/PrimaryModal";


const FollowersFollowing = ({
  onClose,
  openFollowingModal,
  openFollowersModal,
  followersModal,
  followingModal,
}) => {
  const ref = useRef();
  useOnClickOutside(ref, onClose);

  const props = {
    onClose: onClose,
    openFollowingModal: openFollowingModal,
    openFollowersModal: openFollowersModal,
    followersModal: followersModal,
    followingModal: followingModal,
  };

  return (
    <>
      <PrimaryModal modalRef={ref}>
        <FollowersFollowingNavigation {...props} />
        <>
          {followersModal ? (
            <>
              <FollowersContent />
            </>
          ) : (
            <>
              <FollowingContent />
            </>
          )}
        </>
      </PrimaryModal>
    </>
  );
};

export default FollowersFollowing;
