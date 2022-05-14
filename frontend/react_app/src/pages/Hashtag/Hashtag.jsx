import React from "react";
import { Waypoint } from "react-waypoint";
import { useDispatch, useSelector } from "react-redux";
import {
  getHashtag,
  key,
  selectHashtag,
  selectHashtagString,
  setClearHashtag,
  setClearHashtagString,
} from "../../redux/post";
import { selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";
import Hashtags from "../Hashtags/Hashtags";
import Posts from "../../components/Posts/Posts";
import NoData from "../../components/NoData/NoData";
import LoadingPosts from "../../components/Loading/LoadingPosts";
import HashtagInput from "../../components/HashtagInput/HashtagInput";
import BaseContainer from "../../components/BaseContainer/BaseContainer";
import PageNotice from "../../components/PageNotice/PageNotice";
import TextLink from "../../components/TextLink/TextLink";

const Hashtag = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const hashtag = useSelector(selectHashtag);
  const hashtagString = useSelector(selectHashtagString);

  const { loading, nextLoading } = useUI(key?.hashtag, key?.hashtagNext);

  const handleNext = () => {
    if (user) {
      dispatch(getHashtag(hashtagString, hashtag?.next));
    }
  };

  const getAllHashtaggedPostsAgain = () => {
    if (user) {
      dispatch(setClearHashtag());
      dispatch(setClearHashtagString());
    }
  };

  const pageNoticeTitle = <>Hashtagged posts.</>;
  const pageNoticeBody = (
    <>
      {user && (
        <>
          Find posts containing a specific <strong>hashtag</strong>.
          <br />
          Search e.g. <strong>productivity</strong>, <strong>health</strong>,{" "}
          <strong>programming</strong>,<br /> <strong>funny</strong> or{" "}
          <strong>inspiring</strong>.<br />
          {hashtagString !== "" ? (
            <>
              If you didn't find what you're looking for,
              <br /> you can also check out{" "}
              <TextLink
                to='#'
                handleClick={getAllHashtaggedPostsAgain}
                textLinkStyle={{
                  textDecoration: "underline",
                }}
              >
                all hashtagged posts again.
              </TextLink>
            </>
          ) : (
            <>
              If you don't know what you're looking for,
              <br /> you can also scroll down to check out <strong>
                all
              </strong>{" "}
              hashtagged posts.
            </>
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <BaseContainer>
        <PageNotice
          pageNoticeTitle={pageNoticeTitle}
          pageNoticeBody={pageNoticeBody}
        />

        <div style={{ marginTop: "0px" }}>
          <HashtagInput />
        </div>
      </BaseContainer>
      {hashtagString === "" && <Hashtags hashtagPage={true} />}

      {hashtagString !== "" && (
        <>
          <Posts
            loading={loading}
            posts={hashtag?.results}
            noData={
              <NoData>
                <>
                  Could find no posts containing #
                  <strong>{hashtagString}</strong>.
                </>
              </NoData>
            }
          />

          {hashtag && hashtag?.next && nextLoading && (
            <>
              <LoadingPosts />
            </>
          )}
          {hashtag && hashtag?.next && !nextLoading && (
            <>
              <Waypoint
                onEnter={handleNext}
                loading={nextLoading}
                nextUrl={hashtag?.next}
              >
                <div />
              </Waypoint>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Hashtag;
