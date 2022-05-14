import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, key, selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";

import "./UpdateProfileModal.css";
import { bannedWords } from "../../bannedWords";

const UpdateProfile = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    occupation: user?.profile?.occupation,
    education: user?.profile?.education,
    bio: user?.profile?.bio,
    aptitudes: user?.profile?.aptitudes,
    gender: user?.profile?.gender,
    pronouns: user?.profile?.pronouns,
    country: user?.profile?.country,
  });

  const { loading } = useUI(key.updateProfile, null, false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      (formData?.occupation !== user?.profile?.occupation ||
        formData?.education !== user?.profile?.education ||
        formData?.bio !== user?.profile?.bio ||
        formData?.aptitudes !== user?.profile?.aptitudes ||
        formData?.gender !== user?.profile?.gender ||
        formData?.pronouns !== user?.profile?.pronouns ||
        formData?.country !== user?.profile?.country) &&
      !bannedWords.includes(formData?.education) &&
      !bannedWords.includes(formData?.occupation)
    ) {
      await dispatch(updateProfile(formData, user?.username));
    }
    onClose();
  };

  return (
    <>
      <div id='profileUpdateMainTitle'>Update Profile</div>
      <div id='profileUpdateRemoveMargin'>
        <div id='profileUpdateImagesTitle'>Avatar</div>
        <div id='profileUpdateYourImages'>
          Update your avatar
          <br /> by clicking on the image on your profile.
        </div>

        <div id='profileUpdateImagesTitle'>Cover</div>
        <div id='profileUpdateYourImages'>
          Update your cover
          <br /> by clicking on the image on your profile.
        </div>

        <div id='profileUpdateMainFieldsTitle'>Occupation</div>
        <input
          className='profileUpdateMainFields'
          placeholder='Occupation'
          id='occupation'
          name='occupation'
          maxLength='134'
          onChange={handleChange}
          value={formData?.occupation}
          type='text'
        />
        <div id='profileUpdateMainFieldsTitle'>Education</div>
        <input
          className='profileUpdateMainFields'
          placeholder='Education'
          id='education'
          name='education'
          maxLength='134'
          onChange={handleChange}
          value={formData?.education}
          type='text'
        />
        <div id='profileUpdateMainFieldsTitle'>Bio</div>
        <textarea
          placeholder='Bio'
          id='bio'
          name='bio'
          onChange={handleChange}
          type='text'
          maxLength='143'
          value={formData?.bio}
          style={{ overflow: "hidden" }}
        />
        <div id='profileUpdateMainFieldsTitle'>Aptitudes</div>
        <input
          className='profileUpdateMainFields'
          placeholder='Aptitudes'
          id='aptitudes'
          name='aptitudes'
          maxLength='134'
          onChange={handleChange}
          value={formData?.aptitudes}
          type='text'
        />
        <div id='profileUpdateMainFieldsTitle'>Gender</div>
        <input
          className='profileUpdateMainFields'
          placeholder='Gender'
          id='gender'
          name='gender'
          maxLength='25'
          onChange={handleChange}
          value={formData?.gender}
          type='text'
        />
        <div id='profileUpdateMainFieldsTitle'>Pronouns</div>
        <input
          className='profileUpdateMainFields'
          placeholder='Pronouns'
          id='pronouns'
          name='pronouns'
          maxLength='25'
          onChange={handleChange}
          value={formData?.pronouns}
          type='text'
        />
        <div id='profileUpdateMainFieldsTitle'>Country</div>
        <input
          className='profileUpdateMainFields'
          placeholder='Country'
          id='country'
          name='country'
          maxLength='85'
          onChange={handleChange}
          value={formData?.country}
          type='text'
        />
      </div>
      <button
        type='submit'
        id='profileSeeProfile'
        onClick={handleSubmit}
        disabled={loading}
      >
        See Profile
      </button>
    </>
  );
};

export default UpdateProfile;
