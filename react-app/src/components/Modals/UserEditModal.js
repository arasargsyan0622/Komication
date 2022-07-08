import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UserEditForm from "../Forms/UserEdit";
import { useSelector } from "react-redux";

function UserEditModal() {
  const { user } = useSelector((state) => state.session);
  // const { server } = Object.values(useSelector((state) => state?.current_server))[0];
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button className="user__footer__settings" onClick={() => setShowModal(true)}></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UserEditForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default UserEditModal;
