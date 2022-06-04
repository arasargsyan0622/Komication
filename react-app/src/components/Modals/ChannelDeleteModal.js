import React from "react";
import { Modal } from "../../context/Modal";
import ChannelDeleteForm from "../Forms/ChannelDelete";

function ChannelDeleteModal({ confirmDelete, setConfirmDelete }) {
  return (
    <>
      <div
        className="delete__channel__button__container"
        onClick={() => setConfirmDelete(true)}
      >
        <span onClick={() => setConfirmDelete(true)}>Delete Channel</span>
        <div
          className="delete__trash__can"
          onClick={() => setConfirmDelete(true)}
        ></div>
      </div>

      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(false)}>
          <ChannelDeleteForm setConfirmDelete={setConfirmDelete} />
        </Modal>
      )}
    </>
  );
}

export default ChannelDeleteModal;
