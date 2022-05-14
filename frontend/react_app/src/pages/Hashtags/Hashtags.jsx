/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { useDispatch, useSelector } from "react-redux";
import { getHashtagFeed, key, selectHashtagFeed } from "../../redux/post";
import { access } from "../../services/baseServicesHandler";
import useUI from "../../hooks/useUI";
import { baseRoutes } from "../../routes";
import NoData from "../../components/NoData/NoData";
import Posts from "../../components/Posts/Posts";
import LoadingPosts from "../../components/Loading/LoadingPosts";
import BaseContainer from "../../components/BaseContainer/BaseContainer";
import PageNotice from "../../components/PageNotice/PageNotice";
import TextLink from "../../components/TextLink/TextLink";

import "../../styles/pages.css";

const Hashtags = ({ hashtagPage }) => {
  const dispatch = useDispatch();
  const hashtagFeed = useSelector(selectHashtagFeed);

  const { fetched, loading, nextLoading } = useUI(
    key?.hashtagFeed,
    key?.hashtagFeedNext
  );

  const refreshPage = () => {
    window.location.reload();
  };

  const handleNext = () => {
    if (access && fetched && !loading) {
      dispatch(getHashtagFeed(hashtagFeed?.next));
    }
  };

  useEffect(() => {
    if (access && !fetched) {
      dispatch(getHashtagFeed());
    }
  }, []);

  const pageNoticeTitle = <>All hashtagged posts.</>;
  const pageNoticeBody = (
    <>
      Here you'll find <strong>all #hashtagged</strong> posts.
      <br />
      Created by <strong>all</strong> of our users.
      <br /> If you're looking for a specific hashtag,
      <br />
      <TextLink
        to={baseRoutes.hashtags}
        textLinkStyle={{
          textDecoration: "underline",
        }}
      >
        Go here.
      </TextLink>
    </>
  );

  return (
    <>
      {!hashtagPage && (
        <>
          <BaseContainer>
            <PageNotice
              pageNoticeTitle={pageNoticeTitle}
              pageNoticeBody={pageNoticeBody}
            />
          </BaseContainer>
        </>
      )}
      <Posts
        loading={loading}
        posts={hashtagFeed?.results}
        noData={
          <NoData>
            <div onClick={refreshPage} id='refreshPage'>
              No posts could be displayed.
              <br />
              Try to refresh the page.
            </div>
          </NoData>
        }
      />
      {fetched && hashtagFeed?.next && !nextLoading && (
        <Waypoint
          onEnter={handleNext}
          loading={nextLoading}
          nextUrl={hashtagFeed?.next}
        >
          <div />
        </Waypoint>
      )}
      {fetched && hashtagFeed?.next && nextLoading && (
        <>
          <LoadingPosts />
        </>
      )}
    </>
  );
};

export default Hashtags;
