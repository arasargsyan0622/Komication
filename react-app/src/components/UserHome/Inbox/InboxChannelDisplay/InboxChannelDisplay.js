import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./InboxChannelDisplay.css";
import { addMessageThunk } from "../../../../store/dir.msg";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { getCurrentUserInboxes } from "../../../../store/direct_messages";
// import ChannelMessageEdit from "../../../Forms/ChannelMessageEdit";

let socket;

function InboxChannelDisplay({
  channel,
  setCurrentInbox,
  currentInbox,
  please,
}) {
  const dispatch = useDispatch();
  const [chatInput, setChatInput] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const history = useHistory();
  const dummyMsg = useRef();
  const user = useSelector((state) => state.session.user);
  const inboxes = useSelector((state) => state.current_inboxes);
  // console.log(inboxes, "inboxes in the inbox channel");

  const path = window.location.pathname.split("/")[2];
  let filteredInboxes;

  if (inboxes.inbox_channels) {
    const inboxesArray = Object.values(inboxes?.inbox_channels);
    filteredInboxes = inboxesArray?.filter(
      (inbox) => inbox.inbox_uuid === path
    )[0];
  }

  // const CURRENTINBOX = please[0];
  // console.log(please[0], "this is please pleas pleas");
  // console.log(filteredInboxes, "filter inboxes");
  // console.log(currentInbox, "current channel in the inbox channel display");

  const username = filteredInboxes?.users.username;
  const userAvatarIcon = filteredInboxes?.users.avatar_url;
  const oldMessages = filteredInboxes?.inbox_messages;
  // console.log(CURRENTINBOX?.inbox_messages);
  // console.log(CURRENTINBOX, "current inboxxxxxxxxxxxxx");
  // console.log(oldMessages, "old messagessssssss");
  const inboxId = filteredInboxes?.id;

  let chatroom = window.location.pathname;
  useEffect(() => {
    socket = io();
    dummyMsg.current?.scrollIntoView();
    const payload = {
      username: "TestUser",
      room: chatroom,
    };

    socket.emit("join", payload);

    socket.on("chat", (data) => {

      dispatch(getCurrentUserInboxes(user.id));
      dummyMsg.current?.scrollIntoView();
    });

    console.log("hello?asdddddddddddddddddddddddddddddddddddddd");

    return () => {
      const payload = {
        username: "TestUser",
        room: chatroom,
      };
      socket.emit("leave", payload);
      socket.disconnect();
    };
  }, [history, path]);

  const formatDate = (date) => {
    const newDate = moment(date).format("DD/MM/YY hh:mm a");
    return newDate;
  };

  const addMessage = async (e) => {
    e.preventDefault();

    const payload = {
      room: chatroom,
    };

    socket.emit("chat", payload);
    const msgPayload = {
      content: messageContent,
      user_id: user.id,
      inbox_channel_id: inboxId,
    };
    dispatch(addMessageThunk(msgPayload));
    setMessageContent("");
  };

  return (
    <div className="channel__display__container">
      <div className="channel__messages__container">
        <div ref={dummyMsg}></div>
        {oldMessages
          ?.map((message, ind) =>
            message.user_id === user.id ? (
              <div className="channel__message__div" key={ind}>
                <img
                  className="channel__message__avatar"
                  alt="user avatar"
                  src={`${user.avatar_url}`}
                ></img>
                <div className="channel__message__contents">
                  <div className="message__user__time">
                    <div className="channel__message__username">{`${user.username}`}</div>
                    <div className="channel__message__date">{formatDate(message.timestamp)}</div>
                    {message.edited === true ? (
                      <div className="channel__message__edited">(edited)</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="channel__message">{`${message.content}`}</div>
                </div>
              </div>
            ) : (
              <div className="channel__message__div" key={ind}>
                <img
                  className="channel__message__avatar"
                  alt="user avatar"
                  src={`${userAvatarIcon}`}
                ></img>
                <div className="channel__message__contents">
                  <div className="message__user__time">
                    <div className="channel__message__username">{`${username}`}</div>
                    <div className="channel__message__date">{formatDate(message.timestamp)}</div>
                    {message.edited === true ? (
                      <div className="channel__message__edited">(edited)</div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="channel__message">{`${message.content}`}</div>
                </div>
              </div>
            )
          )
          .reverse()}
      </div>
      <form className="channel__chat__form" onSubmit={addMessage}>
        <div className="channel__chat__input__container">
          <div className="channel__add__input"></div>
          <input
            className="channel__chat__input"
            placeholder="Message #channelName"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button className="send__chat__button"></button>
        </div>
      </form>
    </div>
  );
}

export default InboxChannelDisplay;
