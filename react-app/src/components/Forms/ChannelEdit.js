import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import "./NonAuthFormsCSS/ChannelEditForm.css";

import { useSelector, useDispatch } from "react-redux";

function ChannelEditForm({ setShowModal }) {
  const { server } = Object.values(useSelector((state) => state.current_server))[0];

  return (
    <>
      <div className="test__modal__full">
        <form className="channel__edit__form">
          <h1>FULL SCREEN MODAL</h1>
          <div></div>
          <button onClick={() => setShowModal(false)}>CLOSE MODAL</button>
        </form>
      </div>
    </>
  );
}

export default ChannelEditForm;
