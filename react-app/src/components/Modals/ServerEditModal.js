import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ServerEditForm from "../Forms/ServerEdit";
import { useSelector } from "react-redux";

function ServerEditModal() {
  const [showModal, setShowModal] = useState(false);
  const currentServer = useSelector((state) => state.current_server);
  const serverName = Object.values(currentServer)[0]?.server.server_name;

  return (
    <>
      <div
        className="server__title__card__contents"
        onClick={() => setShowModal(true)}
      >
        <div className="server__title" onClick={(e) => setShowModal(true)}>
          {serverName}
        </div>
        <div className="server__edit" onClick={(e) => setShowModal(true)}></div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerEditForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default ServerEditModal;
