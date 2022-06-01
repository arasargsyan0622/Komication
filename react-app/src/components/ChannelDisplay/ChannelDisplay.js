import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import "./ChannelDisplay.css";

import { useHistory } from "react-router-dom";

let socket;

function ChannelDisplay({ channel }) {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const history = useHistory();
  const dummyMsg = useRef();
  console.log(messages);
  useEffect(() => {
    socket = io();

    let chatroom = history.location.pathname;

    console.log(chatroom);
    dummyMsg.current.scrollIntoView();
    let newdate = new Date();
    console.log(newdate);

    const payload = {
      username: "TestUser",
      room: chatroom,
    };

    socket.emit("join", payload);

    socket.on("chat", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
      dummyMsg.current.scrollIntoView();
    });

    return () => {
      console.log("hello");
      const payload = {
        username: "TestUser",
        room: chatroom,
      };
      socket.emit("leave", payload);
      // socket.disconnect();
    };
  }, [history]);

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
  return (
    <div className="channel__display__container">
      <div className="channel__messages__container">
        <div ref={dummyMsg}></div>
        {messages
          .map((message, ind) => (
            <div className="channel__message__div" key={ind}>
              <div className="channel__message__avatar"></div>
              <div className="channel__message__contents">
                <div className="message__user__time">
                  <div className="channel__message__username">{`${message.user}`}</div>
                  <div className="channel__message__date">Date Here</div>
                </div>
                <div className="channel__message">{`${message.msg}`}</div>
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
            placeholder="Message #channelName"
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
