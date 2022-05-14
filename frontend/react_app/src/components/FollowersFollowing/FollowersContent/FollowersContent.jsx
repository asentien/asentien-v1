/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import { useSelector, useDispatch } from "react-redux";
import { getFollowers, key, selectFollowers } from "../../../redux/profile";
import { selectUser } from "../../../redux/user";
import LoadingUserList from "../../Loading/LoadingUserList";
import useUI from "../../../hooks/useUI";
import UserList from "../../UserList/UserList";

import "../FollowersFollowing.css";

const FollowersContent = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const followers = useSelector((s) => selectFollowers(s, username));

  const { fetched, loading, nextLoading } = useUI(
    key?.followers(username),
    key?.followersNext(username)
  );

  const handleNext = () => {
    dispatch(getFollowers(username, followers?.next));
  };

  useEffect(() => {
    if (!fetched && user) {
      dispatch(getFollowers(username));
    }
  }, [username]);

  const render = () => {
    let rendered;
    if (!user) {
      rendered = (
        <div id='noDataModals'>
          Create a free account or log in to view who is following{" "}
          <strong>@{username || "this user"}</strong>.
        </div>
      );
    } else if (loading) {
      rendered = <LoadingUserList isMinified={true} />;
    } else if (followers?.results?.length) {
      rendered = <UserList isMinified={true} list={followers?.results} />;
    } else {
      rendered = (
        <div id='noDataModals'>
          Any followers of <strong>{username || "this user"}</strong> will be
          shown here.
        </div>
      );
    }
    return rendered;
  };

  return (
    <>
      {render()}
      {fetched && followers?.next && !nextLoading && (
        <Waypoint
          onEnter={handleNext}
          loading={nextLoading}
          nextUrl={followers?.next}
        >
          <div />
        </Waypoint>
      )}
      {fetched && followers?.next && nextLoading && (
        <>
          <LoadingUserList isMinified={true} />
        </>
      )}
    </>
  );
};

export default FollowersContent;
