import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";
import PhoneNumberEditForm from "../Forms/PhoneNumberEdit";

function UserPhoneNumberEditModal() {
  const { user } = useSelector((state) => state.session);
  // const { server } = Object.values(useSelector((state) => state?.current_server))[0];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="user__edit__modal__button" onClick={() => setShowModal(true)}>
        Edit
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PhoneNumberEditForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default UserPhoneNumberEditModal;
