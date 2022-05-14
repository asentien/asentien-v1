import dayjs from "dayjs";
import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser, key } from "../../../redux/user";
import { access } from "../../../services/baseServicesHandler";
import useUI from "../../../hooks/useUI";
import { baseRoutes } from "../../../routes";
import { isEmpty, isValidBirthday } from "../../../utils";
import useLockBodyScroll from "../../../hooks/useLockBodyScroll";
import SecondaryModal from "../../Modals/SecondaryModal";
import CloseButton from "../../CloseButton/CloseButton";
import TextLink from "../../TextLink/TextLink";
import { bannedWords } from "../../../bannedWords";

import "./SignupForm.css";
import "../Unauthenticated.css";

const SignupForm = ({ onClose }) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [initialErrorMessage, setInitialErrorMessage] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    month: "",
    day: "",
    year: "",
    date_of_birth: "",
  });
  const [birthdayData, setBirthdayData] = useState({
    month: "",
    day: "",
    year: "",
  });

  const { errors, loading } = useUI(key?.createUser, null, false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    location?.pathname !== "/signup" &&
    location?.pathname !== "/register" &&
    location?.pathname !== "/join" &&
    location?.pathname !== "/create-account"
      ? onClose()
      : history?.push("/");
  };

  const handleChangeBirthday = (event) => {
    setBirthdayData({
      ...birthdayData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const frontendBirthdayFormat =
      birthdayData?.month + "-" + birthdayData?.day + "-" + birthdayData?.year;
    const year = parseInt(birthdayData?.year);
    const minimumAge = year + 13;
    const todaysDate = parseInt(dayjs().format("YYYYMMDD"));
    const frontendBirthdayFormatIs13 = parseInt(
      minimumAge + birthdayData?.month + birthdayData?.day
    );
    const backendBirthdayFormat =
      birthdayData?.year + "-" + birthdayData?.month + "-" + birthdayData?.day;
    formData.date_of_birth = backendBirthdayFormat;

    if (
      !isEmpty(
        formData?.first_name &&
          formData?.last_name &&
          formData?.email &&
          formData?.password &&
          formData?.date_of_birth
      ) &&
      isValidBirthday(frontendBirthdayFormat) &&
      frontendBirthdayFormatIs13 <= todaysDate &&
      year >= 1891 &&
      !bannedWords?.includes(formData?.first_name?.toLowerCase()) &&
      !bannedWords?.includes(formData?.last_name?.toLowerCase())
    ) {
      dispatch(createUser(formData));
    } else {
      setInitialErrorMessage(true);
    }
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
          <div id='authTitleInner'>Sign Up</div>

          <CloseButton
            handleClick={handleClose}
            closeButtonId={"authCloseIcon"}
            closeButtonStyle={{ height: "20px", width: "20px" }}
          />
        </div>

        {!isEmpty(errors) || initialErrorMessage ? (
          <label id='unauthenticatedErrorLabel'>
            Whats your first name and last name?
          </label>
        ) : null}
        <div className='signupNames'>
          <input
            type='text'
            className='signupName'
            placeholder='First name'
            required={true}
            autoFocus
            minLength='1'
            maxLength='50'
            name='first_name'
            id='first_name'
            error={errors.toString(Boolean(errors?.first_name))}
            onChange={handleChange}
            value={formData?.first_name}
          />
          <input
            type='text'
            className='signupName'
            style={{ marginRight: "0" }}
            placeholder='Last name'
            required={true}
            name='last_name'
            id='last_name'
            minLength='1'
            maxLength='50'
            error={errors.toString(Boolean(errors?.last_name))}
            onChange={handleChange}
            value={formData?.last_name}
          />
        </div>
        {!isEmpty(errors) || initialErrorMessage ? (
          <label id='unauthenticatedErrorLabel'>
            What's your <strong>unique</strong> email address?
          </label>
        ) : null}

        <input
          name='email'
          type='email'
          minLength='3'
          maxLength='255'
          className='unauthenticatedMainFields'
          placeholder='Email'
          required={true}
          id='email'
          error={errors.toString(Boolean(errors?.email))}
          onChange={handleChange}
          value={formData?.email}
        />

        {!isEmpty(errors) || initialErrorMessage ? (
          <label id='unauthenticatedErrorLabel'>
            Have you added at least <strong>six</strong> characters?
          </label>
        ) : null}

        <input
          type='password'
          className='unauthenticatedMainFields'
          placeholder='Password'
          name='password'
          minLength='6'
          maxLength='50'
          required={true}
          id='password'
          error={errors.toString(Boolean(errors?.password))}
          onChange={handleChange}
          value={formData?.password}
        />
        {isEmpty(errors) && !initialErrorMessage && (
          <label style={{ marginLeft: "0px", fontSize: "0.75rem" }}>
            Birthday
          </label>
        )}
        {!isEmpty(errors) || initialErrorMessage ? (
          <label id='unauthenticatedErrorLabel'>
            When's your birthday? Month DD YYYY
          </label>
        ) : null}
        <div id='signupDateOfBirthContainer'>
          <select
            className='signupMonth'
            onChange={handleChangeBirthday}
            name='month'
            required={true}
            id='month'
            value={birthdayData?.month}
            style={{ height: "34px", outline: "none" }}
          >
            <option value='' disabled>
              Month
            </option>
            <option name='01' value='01'>
              January
            </option>
            <option name='02' value='02'>
              February
            </option>
            <option name='03' value='03'>
              Mars
            </option>
            <option name='04' value='04'>
              April
            </option>
            <option name='05' value='05'>
              May
            </option>
            <option name='06' value='06'>
              June
            </option>
            <option name='07' value='07'>
              July
            </option>
            <option name='08' value='08'>
              August
            </option>
            <option name='09' value='09'>
              September
            </option>
            <option name='10' value='10'>
              October
            </option>
            <option name='11' value='11'>
              November
            </option>
            <option name='12' value='12'>
              December
            </option>
          </select>
          <input
            type='text'
            className='signupDay'
            placeholder='Day'
            name='day'
            minLength='2'
            maxLength='2'
            required={true}
            id='day'
            error={errors.toString(Boolean(errors?.date_of_birth))}
            onChange={handleChangeBirthday}
            value={birthdayData?.day}
            style={{ marginRight: "5px", marginLeft: "5px" }}
          />
          <input
            type='text'
            className='signupYear'
            placeholder='Year'
            name='year'
            minLength='4'
            maxLength='4'
            required={true}
            id='year'
            error={errors.toString(Boolean(errors?.date_of_birth))}
            onChange={handleChangeBirthday}
            value={birthdayData?.year}
          />
        </div>

        <div id='signupPrivacy'>
          By signing up, you agree to our{" "}
          <TextLink to={baseRoutes.privacy}>privacy policy</TextLink> and to
          adhere by our <TextLink to={baseRoutes.terms}>terms</TextLink>.
        </div>
        <button type='submit' disabled={loading} id='signupButton'>
          Sign Up
        </button>
      </SecondaryModal>
    </>
  );
};

export default SignupForm;
