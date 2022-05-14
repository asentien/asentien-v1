import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/user";
import { setToast } from "../../redux/ui";
import { createContact } from "../../services/postServices";
import CloseButton from "../CloseButton/CloseButton";
import PrimaryModal from "../Modals/PrimaryModal";

import "../PostForm/styles/PostFormModal.css";

const ContactUsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [subject, setContactSubject] = useState("");
  const [message, setContactMessage] = useState("");

  const handleChangeSubject = (event) => {
    setContactSubject(event.target.value);
  };

  const handleChangeMessage = (event) => {
    setContactMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user) {
      createContact(subject, message).then((response) => {
        dispatch(setToast("Contact sent", "secondary"));
        onClose();
        setContactSubject("");
        setContactMessage("");
      });
    }
  };

  return (
    <>
      {user && (
        <PrimaryModal
          createForm
          submitForm={handleSubmit}
          enableOverflow={null}
        >
          <div id='postFormModalHeader'>
            <div id='postFormModalHeaderTitle'>Contact us</div>
            <CloseButton
              handleClick={onClose}
              closeButtonId={"closeIconForm"}
              closeButtonStyle={{ height: "20px", width: "20px" }}
            />
          </div>
          <div id='formSubForm'>
            <textarea
              autoFocus
              className='postFormModalTitle'
              placeholder='[req] contact subject'
              maxLength='200'
              value={subject}
              onChange={handleChangeSubject}
            />
            <div id='postFormCharactersWritten'>{subject?.length}/200</div>
            <textarea
              className='postFormModalBody'
              placeholder='[req] contact message'
              maxLength='979'
              value={message}
              onChange={handleChangeMessage}
              style={{
                height: "185px",
              }}
            />
            <div id='postFormCharactersWritten'>{message?.length}/979</div>
            <button
              id='postFormModalButton'
              type='submit'
              disabled={
                message.trim().length === 0 ||
                subject.trim().length === 0 ||
                user === undefined
              }
            >
              Contact Us
            </button>
          </div>
        </PrimaryModal>
      )}
    </>
  );
};
export default ContactUsForm;
