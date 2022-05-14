import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, key, selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";

import "./ChangePassword.css";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    changePassword: "",
    changeToPassword: "",
  });

  const { loading } = useUI(key.changePassword, null, false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user) {
      dispatch(changePassword(formData));
    }
  };

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit} noValidate id='changePasswordForm'>
          <input
            className='changePasswordInputBody'
            type='password'
            placeholder='Current Password'
            name='changePassword'
            minLength='6'
            maxLength='50'
            required={true}
            id='changePassword'
            onChange={handleChange}
            value={formData?.changePassword}
            disabled={!user}
          />
          <input
            className='changePasswordInputBody'
            placeholder='New Password'
            name='changeToPassword'
            id='changeToPassword'
            minLength='6'
            maxLength='50'
            required={true}
            onChange={handleChange}
            value={formData?.changeToPassword}
            type='password'
            disabled={!user}
          />
          <button
            id='changePasswordButton'
            type='submit'
            disabled={
              !user ||
              formData?.changePassword?.trim()?.length === 0 ||
              formData?.changeToPassword?.trim()?.length === 0 ||
              loading
            }
          >
            Update Password
          </button>
        </form>
      )}
    </>
  );
};

export default ChangePassword;
