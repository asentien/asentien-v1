import React from "react";
import { useHistory } from "react-router-dom";

import "./NoDataPage.css";
import "../../styles/pages.css";

const NoDataPage = ({ userPage, postPage, page404 }) => {
  const history = useHistory();
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <div id='detailNotFound'>
      <h3 id='detailNotFoundTitle'>
        {userPage ? "User" : postPage ? "Post" : "Page"} can't be found
        {!page404 && " right now"}.
      </h3>
      {!page404 && (
        <>
          Try and{" "}
          <strong id='refreshPage' onClick={refreshPage}>
            refresh
          </strong>{" "}
          the page or try again later. {userPage ? "User" : "Post"} might've
          also been deactivated.
        </>
      )}
      <div
        id='noDataPageGoBackButton'
        onClick={
          history?.length > 1
            ? () => history?.goBack()
            : () => history?.push("/")
        }
      >
        Go Back.
        <div>
          <svg id='noDataPageGoBackButtonIcon' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z'
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NoDataPage;
