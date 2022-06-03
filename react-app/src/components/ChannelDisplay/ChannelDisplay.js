import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import "./ChannelDisplay.css";

import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

let socket;

function ChannelDisplay() {
  const history = useHistory();
  const dispatch = useDispatch();
  const dummyMsg = useRef();

  const user = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.current_channel);

  console.log(user);
  console.log(channel);

  const oldMessages = Object.values(Object.values(channel)[0].channel.channel_messages);

  console.log(oldMessages);
  const channelName = Object.values(Object.values(channel)[0])[0].channel_name;

  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  console.log(messages);

  useEffect(() => {
    socket = io();

    let chatroom = history.location.pathname;

    dummyMsg?.current?.scrollIntoView();

    const payload = {
      username: user.username,
      room: chatroom,
    };

    socket.emit("join", payload);

    socket.on("chat", (data) => {
      setMessages((messages) => [...messages, data]);
      dummyMsg?.current?.scrollIntoView();
    });

    return () => {
      const payload = {
        username: user.username,
        room: chatroom,
      };
      socket.emit("leave", payload);
      socket.disconnect();
    };
  }, [dispatch, channel]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    let chatroom = history.location.pathname;

    const payload = {
      user_id: user.username,
      content: chatInput,
      room: chatroom,
    };
    socket.emit("chat", payload);
    setChatInput("");
  };

  return (
    <div className="channel__display__container">
      <div className="channel__messages__container">
        <div ref={dummyMsg}></div>
        {oldMessages
          .map((message, ind) => (
            <div className="channel__message__div" key={ind}>
              <div className="channel__message__avatar"></div>
              <div className="channel__message__contents">
                <div className="message__user__time">
                  <div className="channel__message__username">{`${message.user_id}`}</div>
                  <div className="channel__message__date">{message.timestamp}</div>
                </div>
                <div className="channel__message">{`${message.content}`}</div>
              </div>
            </div>
          ))
          .reverse()}
      </div>
      <form className="channel__chat__form" onSubmit={sendChat}>
        <div className="channel__chat__input__container">
          <div className="channel__add__input"></div>
          <input
            className="channel__chat__input"
            placeholder={`Message #${channelName}`}
            required
            maxLength={900}
            value={chatInput}
            onChange={updateChatInput}
          />
          <button className="send__chat__button"></button>
        </div>
      </form>
    </div>
  );
}

export default ChannelDisplay;
