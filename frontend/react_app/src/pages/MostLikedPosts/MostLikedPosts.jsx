/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Waypoint } from "react-waypoint";
import { useDispatch, useSelector } from "react-redux";
import { getPopularFeed, key, selectPopularFeed } from "../../redux/post";
import useUI from "../../hooks/useUI";

import NoData from "../../components/NoData/NoData";
import Posts from "../../components/Posts/Posts";
import LoadingPosts from "../../components/Loading/LoadingPosts";
import BaseContainer from "../../components/BaseContainer/BaseContainer";
import PageNotice from "../../components/PageNotice/PageNotice";
import TextLink from "../../components/TextLink/TextLink";

import "../../styles/pages.css";

const MostLikedPosts = () => {
  const dispatch = useDispatch();
  const popularFeed = useSelector(selectPopularFeed);

  const { fetched, loading, nextLoading } = useUI(
    key?.popularFeed,
    key?.popularFeedNext
  );

  const refreshPage = () => {
    window.location.reload();
  };

  const handleNext = () => {
    if (fetched && !loading) {
      dispatch(getPopularFeed(popularFeed?.next));
    }
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(getPopularFeed());
    }
  }, []);

  const pageNoticeTitle = <>Most liked posts.</>;
  const pageNoticeBody = (
    <>
      Here you'll find the posts, comments, and shares, with the most{" "}
      <strong>likes</strong> from all of our users. The ranking
      is unaffected by how many dislikes the posts have. <br />
      If you wish to view the <strong>newest </strong> posts solely from our{" "}
      <strong>Asentients</strong> and our{" "}
      <strong>Accelerators</strong>. You can do so by clicking{" "}
      <TextLink
        to='/public'
        textLinkStyle={{
          textDecoration: "underline",
        }}
      >
        here.
      </TextLink>
    </>
  );

  return (
    <>
      <BaseContainer>
        <PageNotice
          pageNoticeTitle={pageNoticeTitle}
          pageNoticeBody={pageNoticeBody}
        />
      </BaseContainer>
      <Posts
        loading={loading}
        posts={popularFeed?.results}
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
      {fetched && !loading && popularFeed?.next && !nextLoading && (
        <Waypoint
          onEnter={handleNext}
          loading={nextLoading}
          nextUrl={popularFeed?.next}
        >
          <div />
        </Waypoint>
      )}
      {fetched && popularFeed?.next && nextLoading && (
        <>
          <LoadingPosts />
        </>
      )}
    </>
  );
};

export default MostLikedPosts;
