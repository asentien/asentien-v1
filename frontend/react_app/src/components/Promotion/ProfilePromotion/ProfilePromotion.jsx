import React, { useState } from "react";
import AcceleratorPromotionButton from "../../AcceleratorPromotionButton/AcceleratorPromotionButton";
import AsentientPromotionButton from "../../AsentientPromotionButton/AsentientPromotionButton";

import "./ProfilePromotion.css";

const ProfilePromotion = ({ profileUser, user }) => {
  const handleAsentientPromotionDisplayNone = () => {
    setAsentientDisplayNone(true);
  };
  const handleAcceleratorPromotionDisplayNone = () => {
    setAcceleratorDisplayNone(true);
    setAsentientDisplayNone(true);
  };
  const [asentientDisplayNone, setAsentientDisplayNone] = useState(false);
  const [acceleratorDisplayNone, setAcceleratorDisplayNone] = useState(false);
  return (
    <div id='profilePromote'>
      {profileUser?.is_asentient === false &&
        user?.is_accelerator &&
        !acceleratorDisplayNone &&
        !asentientDisplayNone && (
          <div
            id='profileHandleAsentientAcceleratorPromotion'
            style={{ display: "flex" }}
            onClick={handleAsentientPromotionDisplayNone}
          >
            <svg id='profilePromotionIcons' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z'
              />
            </svg>

            <AsentientPromotionButton user={profileUser} />
          </div>
        )}
      {profileUser?.is_accelerator === false &&
        user?.is_staff &&
        !acceleratorDisplayNone && (
          <div
            id='profileHandleAsentientAcceleratorPromotion'
            style={{ display: "flex" }}
            onClick={handleAcceleratorPromotionDisplayNone}
          >
            <svg id='profilePromotionIcons' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z'
              />
            </svg>
            <AcceleratorPromotionButton user={profileUser} />
          </div>
        )}
    </div>
  );
};

export default ProfilePromotion;
