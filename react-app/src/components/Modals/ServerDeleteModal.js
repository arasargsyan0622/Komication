import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ConfirmDeleteServer from "../Forms/ServerDeleteForm";

function ServerDeleteModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="server__delete__heading"
        onClick={() => setShowModal(true)}
      >
        Delete Server
      </div>
      <div
        className="server__delete__trash"
        onClick={() => setShowModal(true)}
      ></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDeleteServer />
        </Modal>
      )}
    </>
  );
}

export default ServerDeleteModal;
