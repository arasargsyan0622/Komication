import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ChannelMsgEditForm from "../Forms/ChannelMsgEditForm";

import { useSelector, useDispatch } from "react-redux";

function ChannelMsgEditModal({ socket, message }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelMsgEditForm
            socket={socket}
            setShowModal={setShowModal}
            message={message}
          />
        </Modal>
      )}
    </>
  );
}

export default ChannelMsgEditModal;

