import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LogoutForm from "../Forms/Logout";

import { useSelector, useDispatch } from "react-redux";

function LogoutModal() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.session);
  return (
    <>
      <div className="user__edit__logout" onClick={() => setShowModal(true)}>
        <div>Log Out</div>
        <div className="user__logout__door"></div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LogoutForm setShowModal={setShowModal} user={user} />
        </Modal>
      )}
    </>
  );
}

export default LogoutModal;
