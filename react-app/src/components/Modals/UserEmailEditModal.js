import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useSelector } from "react-redux";
import UserEmailEditForm from "../Forms/UserEmailEdit";

function UserEmailEditModal() {
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
          <UserEmailEditForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default UserEmailEditModal;
