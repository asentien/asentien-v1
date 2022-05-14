import React from "react";
import LoadingPosts from "../Loading/LoadingPosts";
import PostItem from "../PostItem/PostItem";

const Posts = ({ loading, posts, noData }) => {
  const render = () => {
    let rendered;
    if (loading) {
      rendered = <LoadingPosts />;
    } else if (posts?.length) {
      rendered = posts.map((postId) => (
        <PostItem key={postId} postId={postId} />
      ));
    } else {
      rendered = noData;
    }
    return rendered;
  };

  return render();
};

export default Posts;
