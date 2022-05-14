/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { unsetToast } from "../../redux/ui";

import "./Toast.css";
import CloseButton from "../CloseButton/CloseButton";

const Toast = ({ message, typeoftoast }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [toastTimeout, setToastTimeout] = useState(null);

  const handleClose = () => {
    setOpen(false);
    dispatch(unsetToast());
  };

  useEffect(() => {
    setToastTimeout(setTimeout(() => handleClose(), 3500));
    return () => clearTimeout(toastTimeout);
  }, []);

  return (
    <>
      <div id='toastContainer' onClick={handleClose} open={open}>
        <div
          id='toast'
          typeoftoast={typeoftoast}
          style={{
            width:
              typeoftoast === "secondary"
                ? "230px"
                : typeoftoast === "tertiary"
                ? "275px"
                : "",
          }}
        >
          {message}
          <CloseButton
            closeButtonId={"toastCloseIcon"}
            closeButtonStyle={{ height: "20px", width: "20px" }}
          />
        </div>
      </div>
    </>
  );
};

Toast.defaultProps = {
  typeoftoast: "primary",
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  typeoftoast: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};

export default Toast;
