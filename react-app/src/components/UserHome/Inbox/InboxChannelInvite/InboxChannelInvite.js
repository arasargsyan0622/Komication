import "./InboxChannelInvite.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCurrentUserInbox } from "../../../../store/direct_messages";
import { useHistory } from "react-router-dom";

function InboxChannelInvite({ user, setShowModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.session.user);
  // console.log(loggedInUser.id, "logged in user");
  // console.log(user.id, "user that is receiving message id");

  const addInboxChannel = async (newUser) => {
    const userId = loggedInUser.id;
    const payload = {
      userId,
      newUser,
    };
    const res = await dispatch(addCurrentUserInbox(payload));
    console.log(res.inbox_uuid);
    if (!res.message) {
      history.push(`/me/${res.inbox_uuid}`);
      window.location.reload(true);
      setShowModal(false);
    } else {
      history.push("/me/");
    }
  };
  return (
    <div className="create__inbox__channel__invite">
      <div className="inbox__invite__user__contents">
        <img src={user.avatar_url} className="user__search__result__image"></img>
        <div className="inbox__invite__username">{user.username}</div>
      </div>
      <div className="inbox__invite__button" onClick={(e) => addInboxChannel(user.username)}>
        INVITE
      </div>
    </div>
  );
}

export default InboxChannelInvite;
