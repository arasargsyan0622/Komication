import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";
import ChangePasswordForm from "../Forms/ChangePassword";

function ChangePasswordModal() {
  const { user } = useSelector((state) => state.session);
  // const { server } = Object.values(useSelector((state) => state?.current_server))[0];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="user__change__password__button" onClick={() => setShowModal(true)}>
        Change Password
      </div>
      {/* <div className="user__edit__modal__button" onClick={() => setShowModal(true)}>
        Edit
      </div> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChangePasswordForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default ChangePasswordModal;
