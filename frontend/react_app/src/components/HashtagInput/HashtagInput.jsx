import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHashtag,
  key,
  selectHashtagString,
  setClearHashtag,
} from "../../redux/post";
import { selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";

import "./HashtagInput.css";

const HashtagInput = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { loading } = useUI(key?.hashtag);

  const [hashtagString, setHashtagString] = useState(
    useSelector(selectHashtagString)
  );

  const handleInput = (event) => {
    if (user) {
      setHashtagString(event.target.value);
    }
  };

  const handleFindHashtags = () => {
    if (user && hashtagString?.trim()?.length !== 0) {
      dispatch(setClearHashtag());
      dispatch(getHashtag(hashtagString));
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          contentEditable='true'
          placeholder={`Find hashtagged posts`}
          id='hashtagInput'
          onInput={handleInput}
          value={hashtagString}
          autoComplete='off'
          disabled={!user}
        />
        <button
          id='hashtagInputButton'
          onClick={handleFindHashtags}
          disabled={!user && hashtagString?.trim()?.length === 0 && loading}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default HashtagInput;
