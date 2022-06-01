import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ServerInvite from "../Forms/ServerInvite";

function ServerInviteModal() {
  const [showModal, setShowModal] = useState(false);

  const showNestedModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <button className="server__invite__link" onClick={showNestedModal}>
        Join Server
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerInvite setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ServerInviteModal;
