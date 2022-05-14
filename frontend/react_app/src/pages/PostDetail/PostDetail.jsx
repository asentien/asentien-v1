/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPostDetail, key, selectPost } from "../../redux/post";
import useUI from "../../hooks/useUI";
import PostItem from "../../components/PostItem/PostItem";
import NoDataPage from "../../components/NoData/NoDataPage";
import BaseItem from "../../components/BaseItem/BaseItem";

const PostDetail = () => {
  const { postId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const post = useSelector((s) => selectPost(s, postId));

  const { fetched, loading } = useUI(key?.postDetail(postId));

  useEffect(() => {
    if (!fetched) {
      dispatch(getPostDetail(postId));
    }
  }, [postId]);

  const renderPost = () => {
    let renderedPost;

    if (loading) {
      renderedPost = (
        <>
          <BaseItem base children={<>Loading...</>} />
        </>
      );
    } else if (post) {
      renderedPost = (
        <>
          <PostItem
            expandShares={location?.pathname?.endsWith("-shares") && true}
            expandComments={
              location?.pathname?.endsWith("-shares") ? false : true
            }
            expandPostBody
            postId={post?.id}
          />
        </>
      );
    } else {
      renderedPost = <NoDataPage postPage />;
    }
    return renderedPost;
  };

  return <>{renderPost()}</>;
};

export default PostDetail;
