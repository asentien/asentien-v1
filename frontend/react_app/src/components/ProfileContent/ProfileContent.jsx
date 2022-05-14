import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateProfileCover, updateProfileAvatar } from "../../redux/user";
import Avatar from "../Avatar/Avatar";
import FollowButton from "../FollowButton/FollowButton";
import UpdateProfile from "../UpdateProfile/UpdateProfile";

import "./ProfileContent.css";
import DeactivateUser from "../Deactivate/DeactivateUser/DeactivateUser";

const ProfileContent = ({ profileUser, user }) => {
  const coverRef = useRef();
  const avatarRef = useRef();
  const dispatch = useDispatch();
  const handleUpdateAvatar = () => {
    avatarRef?.current?.click();
  };

  const handleUpdateCover = () => {
    coverRef?.current?.click();
  };

  const handleChangeCover = (event, field) => {
    const image = event?.target?.files[0];
    const formData = new FormData();
    const contentFileName = document.getElementById("changeCoverInput").value;
    const indexDot = contentFileName.lastIndexOf(".") + 1;
    const existingFile = contentFileName
      .substr(indexDot, contentFileName.length)
      .toLowerCase();
    if (
      existingFile === "jpeg" ||
      existingFile === "jpg" ||
      existingFile === "png"
    ) {
      formData?.append(field, image, image?.name);
      dispatch(updateProfileCover(formData, user?.username));
    }
  };

  const handleChangeAvatar = (event, field) => {
    const image = event?.target?.files[0];
    const formData = new FormData();
    const contentFileName = document.getElementById("changeAvatarInput").value;
    const indexDot = contentFileName.lastIndexOf(".") + 1;
    const existingFile = contentFileName
      .substr(indexDot, contentFileName.length)
      .toLowerCase();
    if (
      existingFile === "jpeg" ||
      existingFile === "jpg" ||
      existingFile === "png"
    ) {
      formData?.append(field, image, image?.name);
      dispatch(updateProfileAvatar(formData, user?.username));
    }
  };
  return (
    <>
      <div
        onClick={
          user?.username === profileUser?.username
            ? handleUpdateCover
            : undefined
        }
      >
        <img
          src={profileUser?.profile?.cover}
          alt='Cover'
          id={
            user?.username === profileUser?.username
              ? "profileCoverImageUpdate"
              : "profileCoverImage"
          }
        />
      </div>
      <input
        hidden='hidden'
        onChange={(event) => handleChangeCover(event, "cover")}
        ref={coverRef}
        type='file'
        id='changeCoverInput'
        accept='image/jpeg, image/jpg, image/png'
      />
      <Avatar
        isLink={false}
        avatarImageSource={profileUser?.profile?.avatar}
        avatarImageId={"profileAvatarImage"}
        avatarDivId={
          user?.username === profileUser?.username
            ? "profileAvatarWrapperUpdate"
            : "profileAvatarWrapper"
        }
        handleClick={
          user?.username === profileUser?.username
            ? handleUpdateAvatar
            : undefined
        }
      />
      <input
        hidden='hidden'
        onChange={(event) => handleChangeAvatar(event, "avatar")}
        ref={avatarRef}
        type='file'
        id='changeAvatarInput'
        accept='image/jpeg, image/jpg, image/png'
      />

      <div id='profileNameUserOcuEdu'>
        <div id='profileFullNameUpdate'>
          <div id='profileFullName'>
            {profileUser?.first_name} {profileUser?.last_name}
          </div>
          {profileUser?.username !== user?.username ? (
            <FollowButton user={profileUser} isProfile={true} />
          ) : (
            <UpdateProfile />
          )}
        </div>
        <div id='profileUsername'>@{profileUser?.username}</div>

        <div id='profileOccupation'>
          <svg id='profileOccupationEducationIcons' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z'
            />
          </svg>

          {profileUser?.profile?.occupation}
        </div>

        <div id='profileEducation'>
          <svg id='profileOccupationEducationIcons' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z'
            />
          </svg>

          {profileUser?.profile?.education}
        </div>

        <div id='profileBadges'>
          {profileUser?.is_asentient && (
            <div id='profileAsentientBadge'>
              <strong id='profileAsentientBadgeIcon'>a</strong>
            </div>
          )}
          {profileUser?.is_accelerator && (
            <div id='profileAcceleratorBadge'>
              <svg id='profileAcceleratorBadgeIcon' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M12 3.97C7.59 3.97 3.97 7.59 3.97 12C3.97 16.41 7.59 20.03 12 20.03C16.41 20.03 20.03 16.41 20.03 12C20.03 7.59 16.41 3.97 12 3.97M12 2C17.54 2 22 6.46 22 12C22 17.54 17.54 22 12 22C6.46 22 2 17.54 2 12C2 6.46 6.46 2 12 2M13 10.46H16L12 6.5L8 10.46H11V17.5H13'
                />
              </svg>
              <strong id='profileAcceleratorBadgeText'>a</strong>
            </div>
          )}
          {!profileUser.is_asentient && user.is_accelerator && (
            <DeactivateUser
              isDropdown
              isProfile
              profileUser={profileUser}
              user={profileUser}
            />
          )}
        </div>
      </div>

      <div
        id={
          profileUser?.is_asentient
            ? "profileAdditionalInfo"
            : "profileAdditionalInfoNotPromoted"
        }
      >
        <div id='profileOcuEduSmallContainer'>
          <div id='profileOccupationSmall'>
            <svg
              style={{
                height: "20px",
                width: "20px",
                marginRight: "5px",
              }}
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z'
              />
            </svg>
            {profileUser?.profile?.occupation}
          </div>

          <div id='profileEducationSmall'>
            <svg
              style={{
                height: "20px",
                width: "20px",
                marginRight: "5px",
              }}
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z'
              />
            </svg>
            {profileUser?.profile?.education}
          </div>
        </div>
        {profileUser?.profile?.bio && (
          <div id='profileBio'>{profileUser?.profile?.bio}</div>
        )}
        {profileUser?.profile?.aptitudes && (
          <div id='profileAptitudes'>{profileUser?.profile?.aptitudes}</div>
        )}
        <div id='profileGenderPronounsContainer'>
          {profileUser?.profile?.gender && (
            <div id='profileGenderPronouns'>{profileUser.profile.gender}</div>
          )}
          {profileUser?.profile?.pronouns && (
            <div id='profileGenderPronouns'>
              {profileUser?.profile?.pronouns}
            </div>
          )}
        </div>
        {profileUser?.profile?.country && (
          <div id='profileCountry'>{profileUser?.profile?.country}</div>
        )}
      </div>
    </>
  );
};

export default ProfileContent;
