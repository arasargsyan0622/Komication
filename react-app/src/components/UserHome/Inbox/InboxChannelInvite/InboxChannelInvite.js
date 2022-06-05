import "./InboxChannelInvite.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function InboxChannelInvite({ user }) {
  const loggedInUser = useSelector((state) => state.session.user);
  console.log(loggedInUser.id, "logged in user");
  console.log(user.id, "user that is receiving message id");
  const onSubmit = async function () {
    return "logic";
  };

  return (
    <div className="create__inbox__channel__invite">
      <div className="inbox__invite__user__contents">
        <img src={user.avatar_url} className="user__search__result__image"></img>
        <div className="inbox__invite__username">{user.username}</div>
      </div>
      <div className="inbox__invite__button" onClick={onSubmit}>
        INVITE
      </div>
    </div>
  );
}

export default InboxChannelInvite;
