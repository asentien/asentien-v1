/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPopularSearchString,
  selectPopularSearch,
  getPopularSearch,
} from "../../redux/search";
import { selectUser } from "../../redux/user";
import { access } from "../../services/baseServicesHandler";

import "./SearchInput.css";

const SearchPopularInput = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const search = useSelector(selectPopularSearch);
  const user = useSelector(selectUser);

  const [focused, setFocused] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [searchString, setSearchString] = useState(
    useSelector(selectPopularSearchString)
  );

  const handleInput = (event) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    setTypingTimeout(
      setTimeout(() => {
        if (
          access &&
          (focused ||
            (location.pathname === "/popular-users" &&
              search.results.length === 0 &&
              searchString === ""))
        )
          dispatch(getPopularSearch(searchString));
      }, 1000)
    );
  }, [searchString]);

  const onFocus = () => setFocused(true);

  return (
    <>
      <input
        className={`searchInput ${props?.cname}`}
        contentEditable='true'
        placeholder={`Search asentien`}
        onClick={onFocus}
        id='searchInput'
        onInput={handleInput}
        value={searchString}
        autoComplete='off'
        disabled={!user}
      />
    </>
  );
};

export default SearchPopularInput;
