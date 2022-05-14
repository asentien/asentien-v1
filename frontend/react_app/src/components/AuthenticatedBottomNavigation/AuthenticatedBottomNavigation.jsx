import React, { Suspense } from "react";

import "./AuthenticatedBottomNavigation.css";
const AuthenticatedBottomNavigationContent = React.lazy(() =>
  import(
    "../AuthenticatedBottomNavigationContent/AuthenticatedBottomNavigationContent"
  )
);

const AuthenticatedBottomNavigation = () => {
  return (
    <>
      <>
        <div id='bottomNavDivNav'>
          <div id='bottomNavNavigation'>
            <Suspense fallback={<></>}>
              <AuthenticatedBottomNavigationContent />
            </Suspense>
          </div>
        </div>
      </>
    </>
  );
};

export default AuthenticatedBottomNavigation;
