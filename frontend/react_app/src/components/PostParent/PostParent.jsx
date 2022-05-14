import React from "react";
import { baseRoutes } from "../../routes";
import PostContent from "../PostContent/PostContent";
import PostHeader from "../PostHeader/PostHeader";
import TextLink from "../TextLink/TextLink";

import "./PostParent.css";

const PostParent = ({ post }) => {
  return (
    <>
      <div
        id='nestedSharesAndCommentsLine'
        style={{ width: "100%", marginTop: "-1px" }}
      />
      <div
        id='nestedSharesAndCommentsContainer'
        style={{
          marginTop: "-1px",
          marginBottom: post?.body?.trim()?.length === 0 && "-1px",
        }}
      >
        <TextLink
          to={baseRoutes?.postDetail(post?.id)}
          textLinkId={"postParentContainer"}
        >
          <PostHeader post={post} isShared={true} />
          <PostContent post={post} isShared={true} />
        </TextLink>
      </div>
    </>
  );
};

export default PostParent;
