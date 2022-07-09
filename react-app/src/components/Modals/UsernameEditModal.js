import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UsernameEditForm from "../Forms/UsernameEdit";
import { useSelector } from "react-redux";

function UsernameEditModal() {
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
          <UsernameEditForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default UsernameEditModal;
