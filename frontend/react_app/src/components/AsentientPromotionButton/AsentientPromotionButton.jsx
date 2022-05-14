import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { asentientPromotion, key, selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";

import "./AsentientPromotionButton.css";
import "../../styles/components.css";

const AsentientPromotionButton = ({ user, isPostDropdown }) => {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const { loading } = useUI(
    key.asentientPromotion(user?.username),
    null,
    false
  );

  const handleAsentientPromotion = () => {
    if (stateUser?.is_accelerator && !user?.is_asentient && !loading) {
      dispatch(asentientPromotion(user?.username));
    }
  };

  return (
    <>
      {stateUser?.is_accelerator && (
        <div
          style={{
            margin: !isPostDropdown && "0",
            marginLeft: isPostDropdown ? "4px" : "0",
          }}
          onClick={handleAsentientPromotion}
        >
          <button
            className={
              !isPostDropdown
                ? "baseAsentientPromotionButton"
                : "postDropdownFollowFollowingAsentientAcceleratorButton"
            }
            disabled={!stateUser?.is_accelerator || loading}
            style={{
              fontWeight: !isPostDropdown && "600",
              cursor: "pointer",
              border: isPostDropdown && "none",
              outline: isPostDropdown && "none",
              background: "none",
              marginLeft: isPostDropdown && "-10px",
            }}
          >
            {isPostDropdown && (
              <svg
                id='baseAsentientPromotionButtonIcon'
                viewBox='0 0 24 24'
                style={{ marginLeft: "-0px", height: "20px", width: "20px" }}
              >
                <path
                  fill='currentColor'
                  d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
                />
              </svg>
            )}{" "}
            Asentient
          </button>
        </div>
      )}
    </>
  );
};

export default AsentientPromotionButton;
