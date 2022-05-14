import { useLocation } from "react-router-dom";

import "./Loading.css";
import "../../styles/components.css";
import { baseRoutes } from "../../routes";

const LoadingUserList = ({ isMinified, isDropdown, isNotUserList }) => {
  const location = useLocation();
  const loader = (
    <div
      id='header'
      style={{
        marginTop: isNotUserList && "35px",
        marginBottom: isNotUserList && "35px",
        marginLeft: isDropdown
          ? "0"
          : isNotUserList
          ? "10px"
          : !isMinified
          ? "5px"
          : "-5px",
      }}
    >
      {!isNotUserList && (
        <div>
          <div
            id='loadingAnimationUserListAvatar'
            style={{
              marginTop:
                location?.pathname === baseRoutes.popularUsers ||
                location?.pathname === baseRoutes.notifications ||
                location?.pathname === baseRoutes.search ||
                location?.pathname === baseRoutes.users
                  ? "8px"
                  : "",
            }}
          />
        </div>
      )}
      <div
        id='loadingAnimationUserListFullNameUsername'
        style={{
          marginTop:
            location?.pathname === baseRoutes.popularUsers ||
            location?.pathname === baseRoutes.notifications ||
            location?.pathname === baseRoutes.search ||
            location?.pathname === baseRoutes.users
              ? "14px"
              : "",
        }}
      >
        <br />
        <div id='loadingAnimationPostOccupationEducation' />
      </div>
    </div>
  );
  return (
    <>
      {loader}
      {loader}
      {loader}
      {loader}
    </>
  );
};

export default LoadingUserList;
