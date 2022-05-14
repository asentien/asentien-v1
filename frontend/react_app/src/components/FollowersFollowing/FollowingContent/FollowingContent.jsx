/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import { getFollowing, key, selectFollowing } from "../../../redux/profile";
import { selectUser } from "../../../redux/user";
import useUI from "../../../hooks/useUI";
import LoadingUserList from "../../Loading/LoadingUserList";
import UserList from "../../UserList/UserList";

import "../FollowersFollowing.css";

const FollowingContent = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const following = useSelector((s) => selectFollowing(s, username));

  const { fetched, loading, nextLoading } = useUI(
    key.following(username),
    key.followingNext(username)
  );

  const handleNext = () => {
    dispatch(getFollowing(username, following?.next));
  };

  useEffect(() => {
    if (!fetched && user) {
      dispatch(getFollowing(username));
    }
  }, [username]);

  const render = () => {
    let rendered;
    if (!user) {
      rendered = (
        <div className='noDataModals'>
          Create a free account or log in to view who{" "}
          <strong>@{username || "this user"}</strong> is following.
        </div>
      );
    } else if (loading) {
      rendered = <LoadingUserList isMinified={true} />;
    } else if (following?.results?.length) {
      rendered = (
        <UserList
          isMinified={true}
          hasNoBaseUrl={true}
          list={following?.results}
        />
      );
    } else {
      rendered = (
        <div className='noDataModals'>
          Anyone <strong>{username || "the user"}</strong> is following will be
          shown here.
        </div>
      );
    }
    return rendered;
  };

  return (
    <>
      {render()}
      {fetched && following?.next && !nextLoading && (
        <Waypoint
          onEnter={handleNext}
          loading={nextLoading}
          nextUrl={following?.next}
        >
          <div />
        </Waypoint>
      )}
      {fetched && following?.next && nextLoading && (
        <>
          <LoadingUserList isMinified={true} />
        </>
      )}
    </>
  );
};

export default FollowingContent;
