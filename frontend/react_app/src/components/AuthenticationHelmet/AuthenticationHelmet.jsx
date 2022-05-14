import React, { useState } from "react";
import { access } from "../../services/baseServicesHandler";
import SignupForm from "../Unauthenticated/SignupForm/SignupForm";

const AuthenticationHelmet = ({ children, ahId, ahClick, ahStyle }) => {
  const [signupModal, setSignupModal] = useState(false);

  const handleOpen = () => {
    setSignupModal(true);
  };

  const handleClose = () => {
    setSignupModal(false);
  };
  return (
    <>
      {access ? (
        <div id={ahId} style={ahStyle} onClick={ahClick}>
          {children}
        </div>
      ) : (
        <div
          id={ahId}
          style={ahStyle}
          onClick={!signupModal ? handleOpen : handleClose}
        >
          {children}
        </div>
      )}
      {signupModal && (
        <>
          <SignupForm onClose={handleClose} />
        </>
      )}
    </>
  );
};

export default AuthenticationHelmet;
