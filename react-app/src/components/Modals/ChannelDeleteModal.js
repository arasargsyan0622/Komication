import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelDeleteForm from "../Forms/ChannelDelete";

function ChannelDeleteModal({ server }) {
  return (
    <>
      <button className="channel__edit__button" onClick={() => setShowModal(true)}></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelDeleteForm setShowModal={setShowModal} server={server} />
        </Modal>
      )}
    </>
  );
}

export default ChannelDeleteModal;
