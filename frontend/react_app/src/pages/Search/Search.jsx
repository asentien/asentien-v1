import React from "react";
import { Waypoint } from "react-waypoint";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearch,
  getPopularSearch,
  setClearSearch,
  key,
  selectSearch,
  selectPopularSearch,
  selectSearchString,
} from "../../redux/search";
import { selectUser } from "../../redux/user";
import { baseRoutes } from "../../routes";
import useUI from "../../hooks/useUI";
import PageRenderContainer from "../../components/PageRenderContainer/PageRenderContainer";
import TextLink from "../../components/TextLink/TextLink";
import LoadingUserList from "../../components/Loading/LoadingUserList";
import UserList from "../../components/UserList/UserList";
import SearchInput from "../../components/SearchInput/SearchInput";
import BaseContainer from "../../components/BaseContainer/BaseContainer";
import PageNotice from "../../components/PageNotice/PageNotice";

import "./Search.css";
import "../../styles/pages.css";
import SearchPopularInput from "../../components/SearchInput/SearchPopularInput";

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectUser);
  const search = useSelector(selectSearch);
  const popularSearch = useSelector(selectPopularSearch);
  const searchString = useSelector(selectSearchString);

  const { loading, nextLoading } = useUI(key?.search, key?.searchNext);

  const handleNext = () => {
    location.pathname === baseRoutes.popularUsers
      ? dispatch(getPopularSearch(searchString, search?.next))
      : dispatch(getSearch(searchString, search?.next));
  };

  const clearBaseResults = () => {
    dispatch(setClearSearch(searchString, search?.next));
    setTimeout(() => {
      dispatch(getPopularSearch(""));
    });
  };

  const render = () => {
    let rendered;
    if (!user) {
      rendered = <></>;
    } else if (loading) {
      rendered = <LoadingUserList isMinified={false} />;
    } else if (search?.results?.length || popularSearch?.results?.length) {
      rendered = (
        <>
          <UserList
            list={
              location.pathname === baseRoutes.popularUsers
                ? popularSearch?.results
                : search?.results
            }
            isSearch={true}
            isPopularUserPage={
              location.pathname === baseRoutes.popularUsers && true
            }
          />
        </>
      );
    } else if (!loading) {
      rendered = (
        <div id='pageHeading'>
          <div id='pageTextStyle'>
            No results found for "
            <strong
              style={{
                color: "#000",
              }}
            >
              {searchString}
            </strong>
            " .
          </div>
        </div>
      );
    }
    return rendered;
  };

  const pageNoticeTitle = (
    <>
      Asentien's{" "}
      {location.pathname === baseRoutes.popularUsers
        ? "most-followed"
        : "newest"}{" "}
      users.
    </>
  );

  const pageNoticeBody = (
    <>
      Find people to follow.
      <br />
      Search <strong>first name</strong>, <strong>last name</strong>, and{" "}
      <strong>username</strong>.
      <br />
      Scroll down to see more results.
      <br />
      {location.pathname === baseRoutes.popularUsers ? (
        <>
          If you want to get back to the <strong>faster</strong> search page,
          click{" "}
          <TextLink
            to={baseRoutes.users}
            textLinkStyle={{
              textDecoration: "underline",
            }}
          >
            here.
          </TextLink>
        </>
      ) : (
        <>
          If you want to get to know our <strong>most-followed</strong> users,
          you can check them out{" "}
          <TextLink
            to={baseRoutes.popularUsers}
            textLinkStyle={{
              textDecoration: "underline",
            }}
            onClick={clearBaseResults}
          >
            here.
          </TextLink>
        </>
      )}
    </>
  );

  return (
    <>
      <BaseContainer isSpecialPage>
        <div id='pageHeading'>
          <PageNotice
            pageNoticeTitle={pageNoticeTitle}
            pageNoticeBody={pageNoticeBody}
          />
          <div id='searchPageInputContainer' style={{ marginTop: "23px" }}>
            {location.pathname === baseRoutes.popularUsers ? (
              <SearchPopularInput cname='searchPageInput' />
            ) : (
              <SearchInput cname='searchPageInput' />
            )}
          </div>
        </div>

        <PageRenderContainer
          pageRenderContainerStyle={{
            marginTop:
              location.pathname === baseRoutes.popularUsers ? "20px" : "",
          }}
        >
          {render()}
          {search && search?.next && nextLoading && (
            <>
              <LoadingUserList isMinified={false} />
            </>
          )}
        </PageRenderContainer>
      </BaseContainer>

      {search && search?.next && !nextLoading && (
        <>
          <Waypoint
            onEnter={handleNext}
            loading={nextLoading}
            nextUrl={search?.next}
          >
            <div />
          </Waypoint>
        </>
      )}
    </>
  );
};

export default Search;
