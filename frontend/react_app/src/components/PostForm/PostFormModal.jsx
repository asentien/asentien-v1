import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setPost,
  key,
  setUserPost,
  setPublicPost,
  setHashtagsPost,
} from "../../redux/post";
import { selectUser } from "../../redux/user";
import { setToast } from "../../redux/ui";
import useUI from "../../hooks/useUI";
import { createPost } from "../../services/postServices";
import PrimaryModal from "../Modals/PrimaryModal";
import CloseButton from "../CloseButton/CloseButton";

import "./styles/PostFormModal.css";

const PostFormModal = ({ onClose }) => {
  const contentRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [content, setContent] = useState(null);
  const [preview, setPreview] = useState();

  const { loading } = useUI(key?.post, key?.homeFeed, null, false);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeBody = (event) => {
    setBody(event.target.value);
  };

  const handleChangeContent = () => {
    contentRef.current.click();
  };

  useEffect(() => {
    if (content) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(content);
    } else {
      setPreview(null);
    }
  }, [content]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contentFileName = document?.getElementById("content")?.value;
    const indexDot = contentFileName?.lastIndexOf(".") + 1;
    const existingFile = contentFileName
      ?.substr(indexDot, contentFileName?.length)
      ?.toLowerCase();

    if (!loading && user?.is_asentient && body?.trim()?.length > 0) {
      if (content) {
        if (
          existingFile === "jpeg" ||
          existingFile === "jpg" ||
          existingFile === "png" ||
          existingFile === "gif" ||
          existingFile === "mov" ||
          existingFile === "mp4"
        )
          if (content?.size <= 52428800) {
            // post content limit is 50 MB
            createPost(title, content, body)
              .then((response) => {
                onClose();
                const data = response;
                !location?.pathname?.endsWith("/") &&
                  !location?.pathname?.endsWith("/public") &&
                  !location?.pathname?.endsWith("/hashtags") &&
                  dispatch(setUserPost(data));
                location?.pathname === "/" && dispatch(setPost(data));
                location?.pathname === "/public" &&
                  dispatch(setPublicPost(data));
                location?.pathname === "/hashtags" &&
                  body?.includes("#") &&
                  dispatch(setHashtagsPost(data));
                dispatch(setToast("Post Sent"));
                onClose();
              })
              .catch(() => {
                dispatch(setToast("Post Failed", "secondary"));
              });
          }
      } else {
        createPost(title, content, body)
          .then((response) => {
            onClose();
            const data = response;
            !location?.pathname?.endsWith("/") &&
              !location?.pathname?.endsWith("/public") &&
              !location?.pathname?.endsWith("/hashtags") &&
              dispatch(setUserPost(data));
            location?.pathname === "/" && dispatch(setPost(data));
            location?.pathname === "/public" && dispatch(setPublicPost(data));
            location?.pathname === "/hashtags" &&
              body?.includes("#") &&
              dispatch(setHashtagsPost(data));
            dispatch(setToast("Post Sent"));
          })
          .catch(() => {
            dispatch(setToast("Post Failed", "secondary"));
          });
      }
    }
  };

  return (
    <>
      {user?.is_asentient && (
        <PrimaryModal
          createForm
          submitForm={handleSubmit}
          enableOverflow={content}
        >
          <div id='postFormModalHeader'>
            <div id='postFormModalHeaderTitle'>Create a post</div>
            <CloseButton
              handleClick={onClose}
              closeButtonId={"closeIconForm"}
              closeButtonStyle={{ height: "20px", width: "20px" }}
            />
          </div>
          <div id='formSubForm'>
            <textarea
              type='text'
              className='postFormModalTitle'
              maxLength='228'
              placeholder='[opt] title'
              onChange={handleChangeTitle}
              name='title'
              id='title'
            />
            <div id='postFormCharactersWritten'>{title?.length}/228</div>

            {preview && (
              <div id='postFormModalDisplayContent'>
                {preview && content?.size >= 52428800 ? (
                  <>
                    <br />
                    <br />
                    File is too large and your post won't be submitted. Max file
                    size is 50 Megabytes / 52 428 800 Bytes. Please select
                    another file or lower the file quality. We aim to allow
                    larger files in the future.
                  </>
                ) : preview && content?.type?.substr(0, 5) === "image" ? (
                  <img
                    src={preview}
                    value={content}
                    alt='post'
                    style={{ width: "100%", height: "190px" }}
                  />
                ) : preview && content?.type?.substr(0, 5) === "video" ? (
                  <ReactPlayer
                    controls
                    volume={null}
                    muted
                    url={preview}
                    width='100%'
                    height='190px'
                  />
                ) : (
                  <>
                    <br />
                    <br />
                    Invalid file format!
                    <br />
                    Only mp4, png, jpg, jpeg and gif are allowed.
                  </>
                )}
              </div>
            )}

            <textarea
              type='text'
              className='postFormModalBody'
              placeholder='[req] body'
              maxLength='3632'
              name='body'
              id='body'
              onChange={handleChangeBody}
            />
            <div
              className='postFormModalAddContent'
              onClick={handleChangeContent}
              style={{ marginTop: "5px" }}
              id='chat-file'
            >
              <svg id='postFormModalAddContentIcons' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z'
                />
              </svg>

              <svg id='postFormModalAddContentIcons' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M18,9H16V7H18M18,13H16V11H18M18,17H16V15H18M8,9H6V7H8M8,13H6V11H8M8,17H6V15H8M18,3V5H16V3H8V5H6V3H4V21H6V19H8V21H16V19H18V21H20V3H18Z'
                />
              </svg>
            </div>

            <input
              hidden='hidden'
              name='content'
              id='content'
              accept='video/mp4, video/mov, image/gif, image/jpeg, image/jpg, image/png'
              onChange={(e) => {
                setContent(e.target.files[0]);
              }}
              type='file'
              ref={contentRef}
            />
            <button
              id='postFormModalButton'
              type='Submit'
              disabled={
                loading || !user?.is_asentient || body?.trim()?.length === 0
              }
            >
              Post
            </button>
          </div>
        </PrimaryModal>
      )}
    </>
  );
};
export default PostFormModal;
