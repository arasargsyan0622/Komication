import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";
import PhoneNumberEditForm from "../Forms/PhoneNumberEdit";

function UserPhoneNumberEditModal() {
  const { user } = useSelector((state) => state.session);
  console.log(user.phone_number);
  // const { server } = Object.values(useSelector((state) => state?.current_server))[0];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {user.phone_number ? (
        <>
          <div
            className="user__edit__modal__button"
            onClick={() => setShowModal(true)}
          >
            Edit
          </div>
        </>
      ) : (
        <>
          <div
            className="user__edit__modal__button"
            onClick={() => setShowModal(true)}
          >
            Add
          </div>
        </>
      )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PhoneNumberEditForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default UserPhoneNumberEditModal;
