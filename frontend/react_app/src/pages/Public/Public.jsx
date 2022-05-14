/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { Waypoint } from "react-waypoint";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublicFeed,
  getReQueryPublicFeed,
  key,
  selectPublicFeed,
  setClearPublicFeed,
} from "../../redux/post";
import { selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";
import LoadingPosts from "../../components/Loading/LoadingPosts";
import Posts from "../../components/Posts/Posts";
import NoData from "../../components/NoData/NoData";
import BaseItem from "../../components/BaseItem/BaseItem";

import "./styles/Public.css";
import "../../styles/pages.css";

const Public = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const publicFeed = useSelector(selectPublicFeed);

  const { fetched, loading, nextLoading } = useUI(
    key?.publicFeed,
    key?.publicFeedNext
  );

  const refreshPage = () => {
    window.location.reload();
  };

  const handleNext = () => {
    if (fetched && !loading) {
      dispatch(getPublicFeed(publicFeed?.next));
    }
  };

  const reQuery = () => {
    dispatch(setClearPublicFeed());
    dispatch(getReQueryPublicFeed());
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(getPublicFeed());
    }
  }, []);

  return (
    <>
      <main>
        <BaseItem yt>
          <ReactPlayer
            controls
            url={
              "https://www.youtube.com/watch?v=TXeemTPjUCQ&list=PL0HCjuq24JPRn1lAaGecOkdZslTdPDdM1"
            }
            width='100%'
            height='100%'
            id='postContentVideo'
          />
        </BaseItem>
        <center id='noUserMarginBottom'>.</center>
        <BaseItem yt>
          <ReactPlayer
            controls
            url={"https://www.youtube.com/watch?v=0qiK3nx8vu8"}
            width='100%'
            height='100%'
            id='postContentVideo'
          />
        </BaseItem>
        <center id='noUserMarginTop'>.</center>
        <Posts
          loading={loading}
          posts={publicFeed?.results}
          noData={
            <NoData>
              <div onClick={!user ? refreshPage : reQuery} id='refreshPage'>
                No posts could be displayed.
                <br />
                Try to refresh the page.
              </div>
            </NoData>
          }
        />
        {fetched && publicFeed?.next && !nextLoading && (
          <Waypoint
            onEnter={handleNext}
            loading={nextLoading}
            nextUrl={publicFeed?.next}
          >
            <div />
          </Waypoint>
        )}
        {fetched && publicFeed?.next && nextLoading && (
          <>
            <LoadingPosts />
          </>
        )}
      </main>
    </>
  );
};

export default Public;
