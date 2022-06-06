import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ServerEditForm from "../Forms/ServerEdit";
import { useSelector } from "react-redux";
import ServerInviteLink from "../Forms/ServerInviteLink";

function ServerEditModal() {
  const [showModal, setShowModal] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const currentServer = useSelector((state) => state.current_server);
  const serverName = Object.values(currentServer)[0]?.server.server_name;
  const currentUser = useSelector((state) => state.session.user);

  const serverOwner = Object.values(currentServer)[0]?.server.user_id;
  const currentUserId = currentUser.id;

  return (
    <>
      <div className="server__title__card__contents">
        <div className="server__title">{serverName}</div>
        {serverOwner === currentUserId ? (
          <div className="server__options__container">
            <div className="server__invite" onClick={(e) => setShowInvite(true)}></div>
            <div className="server__edit" onClick={(e) => setShowModal(true)}></div>
          </div>
        ) : (
          <div className="server__invite" onClick={(e) => setShowInvite(true)}></div>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerEditForm setShowModal={setShowModal} />
        </Modal>
      )}
      {showInvite && (
        <Modal onClose={() => setShowModal(false)}>
          <ServerInviteLink setShowInvite={setShowInvite}></ServerInviteLink>
        </Modal>
      )}
    </>
  );
}

export default ServerEditModal;
