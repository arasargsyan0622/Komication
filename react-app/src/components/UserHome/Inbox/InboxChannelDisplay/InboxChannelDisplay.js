import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./InboxChannelDisplay.css";
import { addMessageThunk } from "../../../../store/dir.msg";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUserInboxes } from "../../../../store/direct_messages";

let socket;

function InboxChannelDisplay({ channel, setCurentInbox, currentInbox }) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const history = useHistory();
  const dummyMsg = useRef();
  const userId = useSelector((state) => state.session.user.id);
  const inboxes = useSelector((state) => state.current_inboxes);
  // console.log("iofwefwe", inboxes.length)
  const path = window.location.pathname.split("/")[2];
  console.log("path", path)
  let filteredInboxes;
  if (inboxes.inbox_channels) {
    const inboxesArray = Object.values(inboxes?.inbox_channels);
    filteredInboxes = inboxesArray?.filter(
      (inbox) => inbox.inbox_uuid === path
    )[0];
  }
  console.log("filtered", filteredInboxes)
  const oldMessages = filteredInboxes?.inbox_messages;
  const inboxId = filteredInboxes?.id
  // console.log("-----------------", inboxes)

  let chatroom = window.location.pathname;

  useEffect(() => {
    socket = io();

    console.log("chatroom", chatroom);

    dummyMsg.current?.scrollIntoView();

    // let newdate = new Date();
    // console.log(newdate);

    const payload = {
      username: "TestUser",
      room: chatroom,
    };

    socket.emit("join", payload);

    socket.on("chat", (data) => {
      // console.log(data);
      // setMessages((messages) => [...messages, data]);
      dispatch(getCurrentUserInboxes(userId));
      dummyMsg.current?.scrollIntoView();
    });

    return () => {
      console.log("hello");
      const payload = {
        username: "TestUser",
        room: chatroom,
      };
      socket.emit("leave", payload);
      socket.disconnect();
    };
  }, [history, currentInbox, path]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    let chatroom = history.location.pathname;

    const payload = {
      user: "TestUser",
      msg: chatInput,
      room: chatroom,
    };

    socket.emit("chat", payload);
    setChatInput("");
  };

  const formatDate = (date) => {
    const newDate = moment(date).format("DD/MM/YY hh:mm a");
    return newDate;
  };

  const addMessage = async (e) => {
    e.preventDefault();
    // let chatroom = window.location.pathname;

    const payload = {
      room: chatroom,
    };

    socket.emit("chat", payload);
    const msgPayload = {
      content: messageContent,
      user_id: userId,
      inbox_channel_id: inboxId,
    };
    dispatch(addMessageThunk(msgPayload));
    setMessageContent("")
  };

  return (
    <div className="channel__display__container">
      <div className="channel__messages__container">
        <div ref={dummyMsg}></div>
        {oldMessages
          ?.map((message, ind) => (
            <div className="channel__message__div" key={ind}>
              <div className="channel__message__avatar"></div>
              <div className="channel__message__contents">
                <div className="message__user__time">
                  <div className="channel__message__username">{`${message.username}`}</div>
                  <div className="channel__message__date">Date Here</div>
                </div>
                <div className="channel__message">{`${message.content}`}</div>
              </div>
            </div>
          ))
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
