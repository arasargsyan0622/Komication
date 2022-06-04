import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelEditForm from "../Forms/ChannelEdit";

function ChannelEditModal({ channel }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="channel__edit__button"
        onClick={() => setShowModal(true)}
      ></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelEditForm channel={channel} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ChannelEditModal;
