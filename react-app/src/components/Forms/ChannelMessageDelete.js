import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import "./NonAuthFormsCSS/ChannelMessageDelete.css";

import ChannelMessageDeleteForm from "../Forms/ChannelMessageDelete";

import { useSelector, useDispatch } from "react-redux";

function ChannelMessageDelete({ socket, message, normUsers, formatDate, user, setShowModal, eraseMessage }) {
  return (
    <div className="channel__message__delete__form__container">
      <div className="channel__message__delete__heading">Delete Message</div>

      <div className="hElLo_QuEsTiOn_MaRk">Are you sure you want to delete this message?</div>

      <div className="channel__message__delete__contents__container">
        <div>
          <div className="channel__message__delete__contents__avatar"></div>

          <div className="channel__message__delete__user__message__container">
            <div>
              <div className="channel__message__delete__username">{normUsers[message.user_id]?.username}</div>
              <div className="channel__message__delete__timestamp">{formatDate(message.timestamp)}</div>
            </div>
            <div className="channel__message__delete__content">{message.content}</div>
          </div>
        </div>
      </div>

      <div className="channel__message__delete__buttons">
        <span
          onClick={() => {
            setShowModal(false);
          }}
        >
          Cancel
        </span>
        <div
          onClick={(e) => {
            console.log(message);
            eraseMessage(e, message);
          }}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export default ChannelMessageDelete;
