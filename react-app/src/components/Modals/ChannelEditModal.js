import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelEditForm from "../Forms/ChannelEdit";

function ChannelEditModal({ channel }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="channel__edit__button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
      ></button>
      {showModal && (
        <Modal
          onClose={(e) => {
            // e.preventDefault();
            // e.stopPropagation();
            setShowModal(false);
          }}
        >
          <ChannelEditForm channel={channel} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ChannelEditModal;
