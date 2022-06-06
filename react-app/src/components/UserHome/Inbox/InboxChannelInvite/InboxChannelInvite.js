import "./InboxChannelInvite.css";
import React from "react";

function InboxChannelInvite({ user, setShowModal, addInboxChannel, setNewInboxMade }) {
  return (
    <div className="create__inbox__channel__invite">
      <div className="inbox__invite__user__contents">
        <img src={user.avatar_url} alt="user avatar" className="user__search__result__image"></img>
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
