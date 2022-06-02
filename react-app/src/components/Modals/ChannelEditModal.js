import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelEditForm from "../Forms/ChannelEdit";

import { useSelector, useDispatch } from "react-redux";

function ChannelEditModal() {
  const { server } = Object.values(useSelector((state) => state.current_server))[0];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="channel__edit__button" onClick={() => setShowModal(true)}></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelEditForm setShowModal={setShowModal} server={server} />
        </Modal>
      )}
    </>
  );
}

export default ChannelEditModal;
