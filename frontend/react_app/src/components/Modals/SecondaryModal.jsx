import React from "react";

import "./styles/Modals.css";
import "./styles/SecondaryModal.css";

const SecondaryModal = ({ createForm, submitForm, children, modalRef }) => {
  return (
    <>
      <div id='modalBackground'>
        <div
          id='secondaryModalOuter'
          ref={modalRef}
          style={{
            transform:
              navigator.maxTouchPoints ||
              "ontouchstart" in document.documentElement
                ? "translate(-50%, -50%)"
                : "",
          }}
        >
          {createForm ? (
            <form onSubmit={submitForm} noValidate id='secondaryModalInner'>
              {children}
            </form>
          ) : (
            <div id='secondaryModalInner'>{children}</div>
          )}
        </div>
      </div>
    </>
  );
};
export default SecondaryModal;
