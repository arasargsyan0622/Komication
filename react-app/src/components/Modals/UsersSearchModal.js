import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ServerInvite from "../Forms/ServerInvite";

function UsersSearchModal() {
  const [showModal, setShowModal] = useState(false);

  const showNestedModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

export default UsersSearchModal;
