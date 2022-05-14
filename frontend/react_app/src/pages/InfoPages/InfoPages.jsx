import React from "react";
import { useLocation } from "react-router-dom";
import BaseContainer from "../../components/BaseContainer/BaseContainer";
import PageNotice from "../../components/PageNotice/PageNotice";
import { pageNoticeBodyFAQ, pageNoticeTitleFAQ } from "./FAQ/FAQ";
import {
  pageNoticeBodyPrivacyPolicy,
  pageNoticeTitlePrivacyPolicy,
} from "./PrivacyPolicy/PrivacyPolicy";
import { pageNoticeBodyTerms, pageNoticeTitleTerms } from "./Terms/Terms";

const InfoPages = () => {
  const location = useLocation();

  const pageNoticeTitle = (
    <>
      {location?.pathname === "/privacy"
        ? pageNoticeTitlePrivacyPolicy
        : location?.pathname === "/faq"
        ? pageNoticeTitleFAQ
        : pageNoticeTitleTerms}
    </>
  );

  const pageNoticeBody = (
    <>
      {location?.pathname === "/privacy"
        ? pageNoticeBodyPrivacyPolicy
        : location?.pathname === "/faq"
        ? pageNoticeBodyFAQ
        : pageNoticeBodyTerms}
    </>
  );

  return (
    <>
      <BaseContainer isInfoPages>
        <PageNotice
          pageNoticeTitle={pageNoticeTitle}
          pageNoticeBody={pageNoticeBody}
          hasContactModal={
            location?.pathname === "/privacy-and-terms" ? false : true
          }
        />
        {location?.pathname === "/privacy-and-terms" && (
          <PageNotice
            pageNoticeTitle={pageNoticeTitlePrivacyPolicy}
            pageNoticeBody={pageNoticeBodyPrivacyPolicy}
            hasContactModal
          />
        )}
      </BaseContainer>
    </>
  );
};

export default InfoPages;
