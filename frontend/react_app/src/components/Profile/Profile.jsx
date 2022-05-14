import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";

import BaseContainer from "../BaseContainer/BaseContainer";
import LoadingProfile from "../Loading/LoadingProfile";
import ProfileFollowersFollowing from "../FollowersFollowing/ProfileFollowersFollowing/ProfileFollowersFollowing";
import ProfilePromotion from "../Promotion/ProfilePromotion/ProfilePromotion";
import ProfileContent from "../ProfileContent/ProfileContent";
import FollowersFollowing from "../FollowersFollowing/FollowersFollowing";
import NoDataPage from "../NoData/NoDataPage";

const Profile = ({ loading, profileUser }) => {
  const user = useSelector(selectUser);

  const [followersModal, setFollowersModal] = useState(false);
  const [followingModal, setFollowingModal] = useState(false);

  const handleCloseFollowersFollowingModal = () => {
    setFollowingModal(false);
    setFollowersModal(false);
  };

  const handleOpenFollowersModal = () => {
    setFollowersModal(true);
    setFollowingModal(false);
  };

  const handleOpenFollowingModal = () => {
    setFollowingModal(true);
    setFollowersModal(false);
  };

  const props = {
    onClose: handleCloseFollowersFollowingModal,
    openFollowingModal: handleOpenFollowingModal,
    openFollowersModal: handleOpenFollowersModal,
    followersModal: followersModal,
    followingModal: followingModal,
  };

  const renderProfile = () => {
    let render;
    if (loading) {
      render = <LoadingProfile />;
    } else if (profileUser?.username) {
      render = (
        <>
          <BaseContainer isProfile>
            <ProfileContent user={user} profileUser={profileUser} />
            <ProfilePromotion user={user} profileUser={profileUser} />
            <ProfileFollowersFollowing
              profileUser={profileUser}
              openFollowersModal={handleOpenFollowersModal}
              openFollowingModal={handleOpenFollowingModal}
            />
          </BaseContainer>

          {followersModal || followingModal ? (
            <FollowersFollowing {...props} />
          ) : undefined}
        </>
      );
    } else {
      render = (
        <>
          {!loading && (
            <>
              <NoDataPage userPage={true} />
            </>
          )}
        </>
      );
    }
    return render;
  };

  return <>{renderProfile()}</>;
};

export default Profile;
