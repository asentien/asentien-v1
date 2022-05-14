/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserPosts, key, selectUserPosts } from "../../redux/post";
import { selectUser } from "../../redux/user";
import useProfileUser from "../../hooks/useProfileUser";
import useUI from "../../hooks/useUI";
import LoadingPosts from "../../components/Loading/LoadingPosts";

import NoData from "../../components/NoData/NoData";
import Posts from "../../components/Posts/Posts";
import Profile from "../../components/Profile/Profile";
import PostForm from "../../components/PostForm/PostForm";

const UserPosts = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((s) => selectUserPosts(s, username));
  const user = useSelector(selectUser);

  const { profileUser, profileUserLoading } = useProfileUser(username);
  const { fetched, loading, nextLoading } = useUI(
    key?.userPosts(username),
    key?.userPostsNext(username)
  );

  const handleNext = () => {
    dispatch(getUserPosts(username, posts?.next));
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(getUserPosts(username));
    }
  }, [username]);

  return (
    <>
      <Profile loading={profileUserLoading} profileUser={profileUser} />
      {user?.username === username && <PostForm />}
      <Posts
        loading={loading}
        noData={
          user?.username === username ? (
            <NoData>
              <div>Your posts will show here.</div>
            </NoData>
          ) : (
            <NoData>
              <div>
                {profileUser && (
                  <>{profileUser?.first_name} has no posts yet.</>
                )}
              </div>
            </NoData>
          )
        }
        posts={posts?.results}
      />
      {fetched && posts?.next && !nextLoading && (
        <Waypoint
          onEnter={handleNext}
          loading={nextLoading}
          nextUrl={posts?.next}
        >
          <div />
        </Waypoint>
      )}
      {fetched && posts?.next && nextLoading && (
        <>
          <LoadingPosts />
        </>
      )}
    </>
  );
};

export default UserPosts;
