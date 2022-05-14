import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceleratorPromotion, key, selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";

import "./AcceleratorPromotionButton.css";
import "../../styles/components.css";

const AcceleratorPromotionButton = ({ user, isPostDropdown }) => {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const { loading } = useUI(
    key.acceleratorPromotion(user?.username),
    null,
    false
  );

  const handleAcceleratorPromotion = () => {
    if (stateUser?.is_staff && !user?.is_accelerator && !loading) {
      dispatch(acceleratorPromotion(user?.username, user?.username));
    }
  };

  return (
    <>
      {stateUser?.is_staff && (
        <div onClick={handleAcceleratorPromotion}>
          <button
            className={
              !isPostDropdown
                ? "baseAcceleratorPromotionButton"
                : "postDropdownFollowFollowingAsentientAcceleratorButton"
            }
            disabled={!stateUser?.is_staff || loading}
            style={{
              fontWeight: !isPostDropdown && "600",
              cursor: "pointer",
              border: isPostDropdown && "none",
              outline: isPostDropdown && "none",
              background: "none",
              marginLeft: isPostDropdown && "-6px",
            }}
          >
            {isPostDropdown && (
              <svg
                id='baseAcceleratorPromotionButtonIcon'
                viewBox='0 0 24 24'
                style={{ marginLeft: "0px", height: "20px", width: "20px" }}
              >
                <path
                  fill='currentColor'
                  d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z'
                />
              </svg>
            )}{" "}
            Accelerator
          </button>
        </div>
      )}
    </>
  );
};

export default AcceleratorPromotionButton;
