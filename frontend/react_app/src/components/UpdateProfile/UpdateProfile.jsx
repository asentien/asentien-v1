import React, { Suspense, useState } from "react";

import "./UpdateProfile.css";
import PrimaryModal from "../Modals/PrimaryModal";

const UpdateProfileModal = React.lazy(() => import("./UpdateProfileModal"));

const UpdateProfile = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div type='button' id='profileUpdateBaseButton' onClick={handleOpen}>
        Update
      </div>
      {dialogOpen && (
        <PrimaryModal>
          <Suspense fallback={<center>Loading...</center>}>
            <UpdateProfileModal onClose={handleClose} />
          </Suspense>
        </PrimaryModal>
      )}
    </>
  );
};

export default UpdateProfile;
