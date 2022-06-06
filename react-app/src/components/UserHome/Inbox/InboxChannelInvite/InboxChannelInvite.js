import "./InboxChannelInvite.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCurrentUserInbox } from "../../../../store/direct_messages";
import { useHistory } from "react-router-dom";

function InboxChannelInvite({ user, setShowModal, addInboxChannel, setNewInboxMade }) {
  return (
    <div className="create__inbox__channel__invite">
      <div className="inbox__invite__user__contents">
        <img src={user.avatar_url} className="user__search__result__image"></img>
        <div className="inbox__invite__username">{user.username}</div>
      </div>
      <div
        className="inbox__invite__button"
        onClick={(e) => {
          addInboxChannel(user.username);
        }}
      >
        INVITE
      </div>
    </div>
  );
}

export default InboxChannelInvite;
