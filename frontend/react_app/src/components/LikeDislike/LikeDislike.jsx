import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLike,
  createDislike,
  key,
  removeLike,
  removeDislike,
  selectLikedByUser,
  selectDislikedByUser,
  selectPost,
} from "../../redux/post";
import { selectUser } from "../../redux/user";
import useUI from "../../hooks/useUI";
import LikesItem from "../LikesItem/LikesItem";

import "./styles/LikeDislike.css";
import broken_heart_purple from "./styles/brokenheartpurple.svg";
import broken_heart_grey from "./styles/brokenheartgrey.svg";
import heart_purple from "./styles/heartpurple.svg";
import heart_grey from "./styles/heartgrey.svg";
import AuthenticationHelmet from "../AuthenticationHelmet/AuthenticationHelmet";

const LikeDislike = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const post = useSelector((s) => selectPost(s, postId));
  const isLiked = useSelector((s) => selectLikedByUser(s, post?.id, user?.id));
  const isDisliked = useSelector((s) =>
    selectDislikedByUser(s, post?.id, user?.id)
  );
  const { loadingLike } = useUI(key?.like(post?.id), null, false);
  const { loadingDislike } = useUI(key?.dislike(post?.id), null, false);

  const handleLike = () => {
    if (user && !loadingLike && !loadingDislike) {
      if (isLiked) {
        dispatch(removeLike(post?.id, user?.id));
      } else if (isDisliked) {
        dispatch(removeDislike(post?.id, user?.id));
        dispatch(createLike(post?.id, user?.id));
      } else {
        dispatch(createLike(post?.id, user?.id));
      }
    }
  };

  const handleDislike = () => {
    if (user && !loadingDislike && !loadingLike) {
      if (isDisliked) {
        dispatch(removeDislike(post?.id, user?.id));
      } else if (isLiked) {
        dispatch(removeLike(post?.id, user?.id));
        dispatch(createDislike(post?.id, user?.id));
      } else {
        dispatch(createDislike(post?.id, user?.id));
      }
    }
  };

  return (
    <>
      <AuthenticationHelmet
        ahId={"likeDislikeContainer"}
        ahStyle={{ marginRight: "auto", display: "flex" }}
      >
        <div onClick={user ? handleLike : undefined}>
          {isLiked ? (
            <img
              src={heart_purple}
              alt='Liked'
              id='likedDislikedIcon'
              loading='lazy'
            />
          ) : (
            <img
              src={heart_grey}
              alt='Like'
              id='likeDislikeIcon'
              loading='lazy'
            />
          )}
        </div>
        <LikesItem postId={post?.id} />
        <div
          onClick={user ? handleDislike : undefined}
          style={{ marginTop: "0px" }}
        >
          {isDisliked ? (
            <img
              src={broken_heart_purple}
              alt='Disliked'
              id='likedDislikedIcon'
              loading='lazy'
            />
          ) : (
            <img
              src={broken_heart_grey}
              alt='Dislike'
              id='likeDislikeIcon'
              loading='lazy'
            />
          )}
        </div>
      </AuthenticationHelmet>
    </>
  );
};

export default LikeDislike;
