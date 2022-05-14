import React from "react";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import { isHandheldDevice, isSafariBrowser } from "../../utils";

import "./styles/Modals.css";
import "./styles/PrimaryModal.css";

const PrimaryModal = ({
  createForm,
  submitForm,
  enableOverflow,
  children,
  modalRef,
}) => {
  useLockBodyScroll();
  return (
    <>
      <div id='modalBackground'>
        <div
          id='modalOuter'
          ref={modalRef}
          style={{
            transform:
              isHandheldDevice || isSafariBrowser
                ? "translate(-50%, -50%)"
                : "",
            paddingTop: createForm && "0",
            paddingBottom: createForm && "0",
          }}
        >
          {createForm ? (
            <form
              onSubmit={submitForm}
              noValidate
              id='modalInner'
              style={{
                overflowY: enableOverflow === null && "hidden",
              }}
            >
              {children}
            </form>
          ) : (
            <div id='modalInner'>{children}</div>
          )}
        </div>
      </div>
    </>
  );
};
export default PrimaryModal;
