import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import "./NonAuthFormsCSS/ChannelEditForm.css";

import { useSelector, useDispatch } from "react-redux";
import ChannelDeleteModal from "../Modals/ChannelDeleteModal";
import ChannelDeleteForm from "./ChannelDelete";

function ChannelEditForm({ setShowModal }) {
  const { server } = Object.values(useSelector((state) => state.current_server))[0];
  const [confirmDelete, setConfirmDelete] = useState("");

  return (
    <>
      <div className="modal__full">
        <div className="channel__edit__nav__container">
          <div className="channel__edit__nav">
            <div className="channel__nav__header">
              <div className="channel__edit__hash"></div>
              <div className="channel__edit__name">channel</div>
              <div className="channel__edit__placeholder__channels">text channels</div>
            </div>
            <div className="channel__nav__options">
              <div className="channel__edit__option" id="hard__code__channel__edit">
                Overview
              </div>
              <div className="channel__edit__option">Permissions</div>
              <div className="channel__edit__option">Invites</div>
              <div className="channel__edit__option">Integrations</div>
            </div>
            <div className="delete__channel__button__container">
              <span>Delete Channel</span>
            </div>
          </div>
        </div>
        <div className="channel__edit__container">
          <div className="channel__edit__form__container">
            <form className="channel__edit__form">
              <span>OVERVIEW</span>
              <div className="channel__edit__input__container">
                <label>CHANNEL NAME</label>
                <input className="channel__edit__name__input" placeholder="channel name goes here"></input>
              </div>
              <div className="channel__edit__break"></div>
              <div className="channel__edit__save__container">
                <span>Careful -- check if you have unsaved changes!</span>
                <div className="channel__save__buttons__container">
                  <div onClick={() => setConfirmDelete(false)}>Back</div>
                  <button onClick={() => setShowModal(false)} className="channel__edit__save__button">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="full__screen__modal__esc__container" onClick={() => setShowModal(false)}>
            <div onClick={() => setShowModal(false)} className="escape__circle">
              <div onClick={() => setShowModal(false)} className="escape__x"></div>
            </div>
            <div onClick={() => setShowModal(false)} className="escape__text">
              ESC
            </div>
          </div>
        </div>
        <ChannelDeleteForm></ChannelDeleteForm>
      </div>
    </>
  );
}

export default ChannelEditForm;
