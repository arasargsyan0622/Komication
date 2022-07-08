import React, { useState } from "react";
import { Modal } from "../../context/Modal";
// import ChannelMessageEditForm from "../Forms/ChannelMessageEdit";
// import ChannelMessageDeleteForm from "../Forms/ChannelMessageDelete";
import InboxMessageDelete from "../Forms/InboxMessageDeleteForm";


// import { useSelector, useDispatch } from "react-redux";

function InboxMessageDeleteModal({ socket, message, normUsers, formatDate, user, eraseMessage }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="message__delete__button__container" onClick={() => setShowModal(true)}>
        <div onClick={() => setShowModal(true)}></div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <InboxMessageDelete
            setShowModal={setShowModal}
            eraseMessage={eraseMessage}
            message={message}
            user={user}
            normUsers={normUsers}
            formatDate={formatDate}
          ></InboxMessageDelete>
        </Modal>
      )}
    </>
  );
}

export default InboxMessageDeleteModal;
