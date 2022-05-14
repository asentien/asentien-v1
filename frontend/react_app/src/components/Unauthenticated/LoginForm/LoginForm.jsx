import React, { useState } from "react";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { key, loginUser } from "../../../redux/user";
import { access } from "../../../services/baseServicesHandler";
import useUI from "../../../hooks/useUI";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";
import { isEmpty } from "../../../utils";
import { baseRoutes } from "../../../routes";
import SecondaryModal from "../../Modals/SecondaryModal";
import CloseButton from "../../CloseButton/CloseButton";

import "./LoginForm.css";

const LoginForm = ({ onClose, onRedirect }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { errors, loading } = useUI(key.login, null, false);
  const [initialErrorMessage, setInitialErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    location?.pathname !== "/login" &&
    location?.pathname !== "/logon" &&
    location?.pathname !== "/signin"
      ? onClose()
      : history?.push("/");
  };

  const handleSubmit = (event) => {
    if (!isEmpty(formData?.email && formData?.password)) {
      dispatch(loginUser(formData));
    } else {
      setInitialErrorMessage(true);
    }
    event.preventDefault();
  };

  useLockBodyScroll();

  if (access !== null) {
    return <Redirect to={baseRoutes.index} />;
  }

  return (
    <>
      <SecondaryModal createForm submitForm={handleSubmit}>
        <div
          id='authTitleOuter'
          style={{
            display: "flex",
            marginBottom: "-10px",
          }}
        >
          <div id='authTitleInner'>Log In</div>
          <CloseButton
            handleClick={handleClose}
            closeButtonId={"authCloseIcon"}
            closeButtonStyle={{ height: "20px", width: "20px" }}
          />
        </div>

        {!isEmpty(errors) || initialErrorMessage ? (
          <label id='unauthenticatedErrorLabel' style={{ marginBottom: "5px" }}>
            Whats your first name and last name?
          </label>
        ) : null}
        <input
          type='email'
          autoFocus
          className='unauthenticatedMainFields'
          placeholder='Email'
          minLength='3'
          maxLength='255'
          error={errors.toString(!isEmpty(errors))}
          id='email'
          name='email'
          onChange={handleChange}
          value={formData?.email}
        />
        <input
          type='password'
          className='unauthenticatedMainFields'
          placeholder='Password'
          minLength='6'
          maxLength='50'
          error={errors.toString(!isEmpty(errors))}
          id='password'
          name='password'
          onChange={handleChange}
          value={formData?.password}
        />

        <button type='submit' id='loginButton' disabled={loading}>
          Log In
        </button>

        <div id='loginRedirectNoAcc' onClick={onRedirect}>
          No account yet?
        </div>
        <div id='loginRedirectSignup' onClick={onRedirect}>
          Sign Up
        </div>
      </SecondaryModal>
    </>
  );
};

export default LoginForm;
