import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ConfirmDeleteServer from "../Forms/ServerDeleteForm";

function ServerDeleteModal() {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="delete__channel__button__container" onClick={() => setShowConfirm(true)}>
        <span onClick={() => setShowConfirm(true)}>Delete Server</span>
        <div className="delete__trash__can" onClick={() => setShowConfirm(true)}></div>
      </div>
      {showConfirm && (
        <Modal onClose={() => setShowConfirm(false)}>
          <ConfirmDeleteServer setShowConfirm={setShowConfirm} />
        </Modal>
      )}
    </>
  );
}

export default ServerDeleteModal;
