/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomeFeed,
  getReQueryHomeFeed,
  key,
  selectHomeFeed,
  setClearHomeFeed,
} from "../../redux/post";
import { selectUser } from "../../redux/user";
import { access } from "../../services/baseServicesHandler";
import useUI from "../../hooks/useUI";
import PostForm from "../../components/PostForm/PostForm";
import Posts from "../../components/Posts/Posts";
import NoData from "../../components/NoData/NoData";
import LoadingPosts from "../../components/Loading/LoadingPosts";
import { baseRoutes } from "../../routes";
import TextLink from "../../components/TextLink/TextLink";

import "../../styles/pages.css";

const Home = () => {
  const dispatch = useDispatch();
  const homeFeed = useSelector(selectHomeFeed);
  const user = useSelector(selectUser);
  const reQuery = () => {
    dispatch(setClearHomeFeed());
    dispatch(getReQueryHomeFeed());
  };

  const { fetched, loading, nextLoading } = useUI(
    key?.homeFeed,
    key?.homeFeedNext
  );

  useEffect(() => {
    if (access && !fetched) {
      dispatch(getHomeFeed());
    }
  }, []);

  const handleNext = () => {
    if (access && fetched && !loading) {
      dispatch(getHomeFeed(homeFeed?.next));
    }
  };

  if (!access) {
    return <Redirect to={baseRoutes.index} />;
  }

  return (
    <>
      <main>
        <PostForm />

        <Posts
          loading={loading}
          posts={homeFeed?.results}
          noData={
            <NoData>
              <>
                {access !== null && user?.following?.length === 0 ? (
                  <TextLink to={baseRoutes.users} textLinkId={"refreshPage"}>
                    Follow the users delivering internet's promise.
                  </TextLink>
                ) : (
                  <div onClick={reQuery} id='refreshPage'>
                    No posts could be displayed.
                    <br />
                    Try to refresh the page.
                  </div>
                )}
              </>
            </NoData>
          }
        />

        {fetched && homeFeed?.next && !nextLoading && (
          <Waypoint
            onEnter={handleNext}
            loading={nextLoading}
            nextUrl={homeFeed?.next}
          >
            <div />
          </Waypoint>
        )}
        {fetched && homeFeed?.next && nextLoading && (
          <>
            <LoadingPosts />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
