import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShare, key, selectPost } from "../../../redux/post";
import { selectUser } from "../../../redux/user";
import useUI from "../../../hooks/useUI";
import Avatar from "../../Avatar/Avatar";

import "../NestedForm.css";

const ShareForm = ({ postId }) => {
  dayjs.extend(relativeTime);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const post = useSelector((s) => selectPost(s, postId));

  const { loading } = useUI(key.share(post?.id), null, false);
  const [body, setBody] = useState("");

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user && body?.length <= 300) {
      await dispatch(createShare(user?.username, body, postId));
      setBody("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <div id='nestedFormContainer'>
          <Avatar isLink={false} avatarImageStyle={{ marginTop: "14px" }} />
          <input
            id='nestedFormBody'
            placeholder='Share [opt] with body'
            onChange={handleChange}
            value={body}
            disabled={!user}
            style={{
              marginTop: "4px",
            }}
          />
        </div>
        <button id='nestedFormButton' disabled={loading || !user} type='submit'>
          Share
        </button>
      </form>
    </>
  );
};

export default ShareForm;
