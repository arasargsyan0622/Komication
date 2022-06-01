import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NewServerForm from "../Forms/NewServer";

function NewServerModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="user__add__server__logo"
        onClick={() => setShowModal(true)}
      ></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewServerForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default NewServerModal;
