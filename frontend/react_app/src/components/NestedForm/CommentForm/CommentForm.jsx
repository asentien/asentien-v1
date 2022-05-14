import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, key } from "../../../redux/post";
import { selectUser } from "../../../redux/user";
import useUI from "../../../hooks/useUI";
import Avatar from "../../Avatar/Avatar";

import "../NestedForm.css";

const CommentForm = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { loading } = useUI(key.comment(postId), null, false);
  const [body, setBody] = useState("");

  const handleChange = (event) => {
    setBody(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (user && body?.length <= 300) {
      dispatch(createComment(user?.username, body, postId));
      setBody("");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div id='nestedFormContainer'>
        <Avatar isLink={false} avatarImageStyle={{ marginTop: "14px" }} />
        <input
          id='nestedFormBody'
          placeholder='Add a comment'
          onChange={handleChange}
          value={body}
          disabled={!user}
          style={{
            marginTop: "4px",
          }}
        />
      </div>
      <button
        id='nestedFormButton'
        disabled={loading || body?.trim()?.length === 0 || !user}
        type='submit'
        onSubmit={handleSubmit}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
