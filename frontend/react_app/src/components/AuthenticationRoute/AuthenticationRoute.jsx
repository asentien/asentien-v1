import React from "react";
import { Route, useHistory } from "react-router-dom";
import { access } from "../../services/baseServicesHandler";

const AuthenticationRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  return (
    <Route
      render={(props) =>
        access ? (
          <Component {...props} />
        ) : (
          history.push("/signup")
        )
      }
      {...rest}
    />
  );
};

export default AuthenticationRoute;
