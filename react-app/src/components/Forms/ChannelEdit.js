import React, { useState } from "react";
import "./NonAuthFormsCSS/ChannelEditForm.css";

import { useSelector, useDispatch } from "react-redux";
import ChannelDeleteModal from "../Modals/ChannelDeleteModal";
import { updateChannel } from "../../store/current_server";
import { getCurrChannel } from "../../store/current_channel_msg";

function ChannelEditForm({ channel, setShowModal }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editName, setEditName] = useState("");
  const dispatch = useDispatch();

  const currChannel = Object.values(
    useSelector((state) => state.current_channel)
  );
  const uuid = currChannel[0]?.channel.channel_uuid;

  const editChannel = async () => {
    const payload = {
      channel_name: editName,
      uuid,
    };
    dispatch(updateChannel(payload))
      .then(() => dispatch(getCurrChannel(uuid)))
      .then(() => setShowModal(false));
  };

  return (
    <>
      <div className="modal__full">
        <div className="channel__edit__nav__container">
          <div className="channel__edit__nav">
            <div className="channel__nav__header">
              <div className="channel__edit__hash"></div>
              <div className="channel__edit__name">channel</div>
              <div className="channel__edit__placeholder__channels">
                text channels
              </div>
            </div>
            <div className="channel__nav__options">
              <div
                className="channel__edit__option"
                id="hard__code__channel__edit"
              >
                Overview
              </div>
              <div className="channel__edit__option">Permissions</div>
              <div className="channel__edit__option">Invites</div>
              <div className="channel__edit__option">Integrations</div>
            </div>
            <ChannelDeleteModal
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
            ></ChannelDeleteModal>
          </div>
        </div>
        <div className="channel__edit__container">
          <div className="channel__edit__form__container">
            <div>
              <form className="channel__edit__form">
                <span>OVERVIEW</span>
                <div className="channel__edit__input__container">
                  <label>CHANNEL NAME</label>
                  <input
                    className="channel__edit__name__input"
                    placeholder={`${channel.channel_name}`}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  ></input>
                </div>
                <div className="channel__edit__break"></div>
              </form>
            </div>

            <div className="channel__save__container">
              <div className="channel__edit__break"></div>
              <div className="channel__edit__save__container">
                <span>Careful -- check if you have unsaved changes!</span>
                <div className="channel__save__buttons__container">
                  <div onClick={() => setShowModal(false)}>Back</div>
                  <button
                    onClick={() => editChannel()}
                    className="channel__edit__save__button"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="full__screen__modal__esc__container"
            onClick={() => setShowModal(false)}
          >
            <div onClick={() => setShowModal(false)} className="escape__circle">
              <div
                onClick={() => setShowModal(false)}
                className="escape__x"
              ></div>
            </div>
            <div onClick={() => setShowModal(false)} className="escape__text">
              ESC
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChannelEditForm;
