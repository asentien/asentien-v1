import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user";
import BaseContainer from "../../components/BaseContainer/BaseContainer";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import PageNotice from "../../components/PageNotice/PageNotice";
import GrayLine from "../../components/GrayLine/GrayLine";
import DeactivateUser from "../../components/Deactivate/DeactivateUser/DeactivateUser";

const Settings = () => {
  const user = useSelector(selectUser);
  const pageNoticeTitle = <>Settings</>;

  const pageNoticeBody = (
    <>
      If you wish to either deactivate your account or change your password you
      can do so by either pressing the deactivate button or by first typing in
      your old password, then your new one, right here on this page.
      <br />
      <br /> If you wish to alter other details about your account, e.g. first
      name, last name or email address, please contact us through our contact
      form. Asentien is still in the Alpha stage therefore multiple parts of the
      service is being improved upon. This is one of them. Thank you for
      understanding.
    </>
  );

  return (
    <>
      <BaseContainer isInfoPages>
        <PageNotice
          pageNoticeTitle={pageNoticeTitle}
          pageNoticeBody={pageNoticeBody}
        />
        <GrayLine grayLineStyle={{ marginTop: "10px" }} />
        <strong>Change password:</strong>
        <ChangePassword />
        <GrayLine grayLineStyle={{ marginTop: "10px" }} />
        <strong>Deactivate account:</strong>
        <DeactivateUser user={user} />
      </BaseContainer>
    </>
  );
};

export default Settings;
