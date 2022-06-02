import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import NewChannelForm from "../Forms/NewChannel";
import { useSelector } from "react-redux";

function NewChannelModal() {
  const { server } = Object.values(
    useSelector((state) => state?.current_server)
  )[0];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="server__create__channel__button"
        onClick={() => setShowModal(true)}
      ></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewChannelForm setShowModal={setShowModal} server={server} />
        </Modal>
      )}
    </>
  );
}

export default NewChannelModal;
