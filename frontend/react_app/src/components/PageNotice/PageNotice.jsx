import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import ContactUsForm from "../ContactForm/ContactForm";

import "./PageNotice.css";

const PageNotice = ({ pageNoticeTitle, pageNoticeBody, hasContactModal }) => {
  const user = useSelector(selectUser);
  const [contactUsModal, setContactUsModal] = useState(false);

  const handleOpenContactUsModal = () => {
    setContactUsModal(true);
  };

  const handleCloseContactUsModal = () => {
    setContactUsModal(false);
  };

  return (
    <>
      <h3 id='pageNoticeH3'>{pageNoticeTitle}</h3>
      <div id='pageNoticeTextStyle'>
        {pageNoticeBody}
        {user && hasContactModal && (
          <div onClick={handleOpenContactUsModal} id='pageNoticeContact'>
            Contact us
          </div>
        )}
      </div>
      {contactUsModal && <ContactUsForm onClose={handleCloseContactUsModal} />}
    </>
  );
};
export default PageNotice;
