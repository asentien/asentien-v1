import React, { useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, createAccessToken, getCurrentUser } from "./redux/user";
import { access, refresh } from "./services/baseServicesHandler";
import { selectToast } from "./redux/ui";

import ErrorBoundary from "./ErrorBoundary";
import TopNavigation from "./components/TopNavigation/TopNavigation";
import AuthenticatedBottomNavigation from "./components/AuthenticatedBottomNavigation/AuthenticatedBottomNavigation";
import UnauthenticatedBottomNavigation from "./components/Unauthenticated/UnauthenticatedBottomNavigation/UnauthenticatedBottomNavigation";
import Routes from "./components/Routes/Routes";

import "./index.css";

const Toast = React.lazy(() => import("./components/Toast/Toast"));

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const toast = useSelector(selectToast);

  useEffect(() => {
    if (access !== null && user === false) {
      dispatch(getCurrentUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const refreshToken = () => {
      if (refresh) {
        dispatch(createAccessToken(refresh));
      }
    };
    refreshToken();
    return () => {
      clearInterval(setInterval(refreshToken, 3600000));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, dispatch]);

  return (
    <div id='App'>
      <ErrorBoundary>
        <TopNavigation />
      </ErrorBoundary>
      <ErrorBoundary>
        <Suspense fallback={<></>}>
          {toast?.message && (
            <Toast message={toast?.message} typeoftoast={toast?.typeoftoast} />
          )}
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
      <ErrorBoundary>
        {user || access || refresh ? (
          <AuthenticatedBottomNavigation />
        ) : (
          <UnauthenticatedBottomNavigation />
        )}
      </ErrorBoundary>
    </div>
  );
}

export default App;
