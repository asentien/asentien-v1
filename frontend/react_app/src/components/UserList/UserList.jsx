import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import FollowButton from "../FollowButton/FollowButton";
import { baseRoutes } from "../../routes";

import "./UserList.css";
import Avatar from "../Avatar/Avatar";
import HeaderOccupationEducation from "../OccupationEducationHeader/OccupationEducationHeader";

const UserList = ({
  list,
  isMinified,
  isDropdown,
  isSearch,
  isPopularUserPage,
}) => {
  const user = useSelector(selectUser);
  return (
    <>
      {list.map((profileUser) => (
        <div id='userListContainer' key={profileUser?.username}>
          <Avatar
            isLink={true}
            avatarLinkTo={baseRoutes.userPosts(profileUser?.username)}
            avatarLinkStyle={{
              marginLeft: isDropdown ? "0" : !isMinified ? "5px" : "-5px",
            }}
            avatarImageSource={
              profileUser?.profile?.avatar
            }
            avatarImageStyle={{
              marginTop:
                isPopularUserPage || (isSearch && profileUser?.is_asentient)
                  ? "8px"
                  : "",
            }}
          />

          <HeaderOccupationEducation
            profileUser={profileUser}
            dataType={profileUser}
            headerLinkId={"userListHeaderLinkStyle"}
            headerLinkTo={baseRoutes.userPosts(profileUser?.username)}
            isPopularUserPage={isPopularUserPage}
          />

          {profileUser?.username !== user?.username && !isDropdown && (
            <div
              style={{
                marginLeft: "auto",
                marginTop: "13px",
              }}
            >
              <FollowButton user={profileUser} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default UserList;
