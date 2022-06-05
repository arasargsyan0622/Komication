import "./InboxChannelInvite.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addCurrentUserInbox } from "../../../../store/direct_messages"

function InboxChannelInvite({ user }) {
  const dispatch = useDispatch()
  const loggedInUser = useSelector((state) => state.session.user);
  // console.log(loggedInUser.id, "logged in user");
  // console.log(user.id, "user that is receiving message id");

  const addInboxChannel = async (newUser) =>{
    const userId = loggedInUser.id
    const payload ={
      userId,
      newUser
    }
    const res = await dispatch(addCurrentUserInbox(payload))
    if (!res.message) {
      console.log("close modal here")
    } else {
      console.log("we need to redirect at line 23 inbox already exists")
    }
  }
  return (
    <div className="create__inbox__channel__invite">
      <div className="inbox__invite__user__contents">
        <img src={user.avatar_url} className="user__search__result__image"></img>
        <div className="inbox__invite__username">{user.username}</div>
      </div>
      <div className="inbox__invite__button" onClick={(e)=>addInboxChannel(user.username)}>
        INVITE
      </div>
    </div>
  );
}

export default InboxChannelInvite;
