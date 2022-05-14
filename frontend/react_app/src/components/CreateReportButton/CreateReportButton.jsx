import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import { selectPost, createReport } from "../../redux/post";
import TextLink from "../TextLink/TextLink";

const CreateReport = ({ signupRedirect, postId }) => {
  const dispatch = useDispatch();
  const post = useSelector((s) => selectPost(s, postId));
  const user = useSelector(selectUser);

  const handleReport = () => {
    dispatch(createReport(postId, post?.parent?.id));
  };

  return (
    <>
      <TextLink
        to={"#"}
        handleClick={!user ? signupRedirect : handleReport}
        textLinkId={"postDropdownLink"}
        textLinkStyle={{
          textDecoration: "none",
          paddingRight: "76px",
        }}
      >
        <svg id='postDropdownIcons' viewBox='0 0 24 24'>
          <path
            fill='currentColor'
            d='M13 13H11V7H13M11 15H13V17H11M15.73 3H8.27L3 8.27V15.73L8.27 21H15.73L21 15.73V8.27L15.73 3Z'
          />
        </svg>
        Report
      </TextLink>
    </>
  );
};

export default CreateReport;
