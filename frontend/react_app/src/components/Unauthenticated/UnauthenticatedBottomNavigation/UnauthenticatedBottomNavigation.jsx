import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/user";
import SignupForm from "../SignupForm/SignupForm";
import LoginForm from "../LoginForm/LoginForm";

import "./UnauthenticatedBottomNavigation.css";
const UnauthenticatedBottomNavigationContent = React.lazy(() =>
  import("./UnauthenticatedBottomNavigationContent")
);

const UnAuthenticatedBottomNavigation = () => {
  const user = useSelector(selectUser);
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const handleOpenSignupModal = () => {
    setSignupModal(true);
  };
  const handleOpenLoginModal = () => {
    setLoginModal(true);
  };

  const handleCloseSignupModal = () => {
    setSignupModal(false);
  };
  const handleCloseLoginModal = () => {
    setLoginModal(false);
  };

  const handleLoginModalRedirect = () => {
    setLoginModal(false);
    setSignupModal(true);
  };

  return (
    <>
      {!user && (
        <div id='bottomNavDivNav'>
          <div id='bottomNav'>
            <Suspense fallback={<></>}>
              <UnauthenticatedBottomNavigationContent
                handleOpenLoginModal={handleOpenLoginModal}
                handleOpenSignupModal={handleOpenSignupModal}
              />
            </Suspense>
          </div>
        </div>
      )}
      {loginModal && (
        <LoginForm
          onClose={handleCloseLoginModal}
          onRedirect={handleLoginModalRedirect}
        />
      )}

      {signupModal && <SignupForm onClose={handleCloseSignupModal} />}
    </>
  );
};

export default UnAuthenticatedBottomNavigation;
