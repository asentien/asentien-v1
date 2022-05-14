import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import PostDropdownContent from "./PostDropdownContent";

import "./PostDropdown.css";

const PostDropdown = ({ post, onClose, signupRedirect }) => {
  const ref = useRef();
  useOnClickOutside(ref, onClose);

  return (
    <div id='postDropdown' ref={ref}>
      <PostDropdownContent
        post={post}
        onClose={onClose}
        signupRedirect={signupRedirect}
      />
    </div>
  );
};

export default PostDropdown;
