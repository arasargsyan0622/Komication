import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./NonAuthFormsCSS/NewChannelForm.css";

import { createChannel } from "../../store/current_server";

const NewChannelForm = ({ setShowModal, server }) => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const [channelName, setChannelName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      myServer: server,
      channel_name: channelName,
    };

    await dispatch(createChannel(payload));
    setShowModal(false);
  };

  return (
    <div className="create__channel__form__container">
      <div className="create__channel__form__heading">
        <div className="create__channel__header__container">
          <h2 className="create__channel__header">CreateChannel</h2>
          <div className="create__channel__message">In Text Channels</div>
        </div>
        <button
          className="cancel__modal__x"
          onClick={() => setShowModal(false)}
        ></button>
      </div>
      <form className="create__channel__form">
        <div className="server__channel__add__placeholder__top">
          <div className="server__text__channel__add__placeholder">
            <div className="text__channel__add__hash"></div>
            <div className="text__channel__add__message">
              <div>Text</div>
              <span>Send messages, ideas, opinions, and puns</span>
            </div>
            <div className="text__channel__add__radio"></div>
          </div>
          <div className="server__voice__channel__add__placeholder">
            <div className="voice__channel__add__speaker"></div>
            <div className="voice__channel__add__message">
              <div>Voice</div>
              <span>Coming Soon! Come hang out together with voice!</span>
            </div>
            <div className="voice__channel__add__radio"></div>
          </div>
        </div>
        <label className="create__channel__label">CHANNEL NAME</label>
        <div className="create__channel__input__container">
          <span className="new__channel__hash">#</span>
          <input
            className="create__channel__name__input"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            type="text"
            placeholder="new-channel"
          />
        </div>
        <div className="server__channel__add__placeholder__bottom">
          <div className="private__channel__header__container">
            <div>
              <div className="private__channel__lock"></div>
              <div className="private__channel__header">Private Channel</div>
            </div>
            <span className="private__channel__x">
              <span></span>
            </span>
          </div>
          <div className="private__channel__message">
            Coming soon, private channels for select members and roles!
          </div>
        </div>
      </form>
      <div className="create__channel__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Cancel</div>
        <button className="create__channel__button" onClick={handleSubmit}>
          Create Channel
        </button>
      </div>
    </div>
  );
};

export default NewChannelForm;
