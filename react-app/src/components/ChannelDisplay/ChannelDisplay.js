import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import "./ChannelDisplay.css";
import moment from "moment";
import ChannelMessageEdit from "../Forms/ChannelMessageEdit";

import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrChannel,
  createMessage,
  deleteMessage,
  updateMessage,
} from "../../store/current_channel_msg";

import { getCurrServer } from "../../store/current_server";

import ChannelMessageDeleteModal from "../../components/Modals/ChannelMessageDeleteModal";
import ChannelMessageView from "./ChannelMessage/ChannelMessageView";

let socket;

function ChannelDisplay() {
  const history = useHistory();
  const dispatch = useDispatch();
  const dummyMsg = useRef();
  // const [ isLoaded, setIsLoaded ] = useState(false)

  const user = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.current_channel);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const channelMessages = Object.values(channel)[0].channel.channel_messages;
  const currServer = Object.values(
    useSelector((state) => state.current_server)
  )[0];
  const users = currServer.server.users;
  const normUsers = {};
  users.forEach((user) => {
    normUsers[user.id] = user;
  });
  console.log(normUsers);
  const myChannelId = Object.values(channel)[0].channel.id;
  const myChannelName = Object.values(channel)[0].channel.channel_name;
  const myChannelUuid = Object.values(channel)[0].channel.channel_uuid;

  useEffect(() => {
    // dispatch(getCurrChannel(uuid)).then(()=>setIsLoaded(true))

    socket = io();

    let chatroom = history.location.pathname;

    dummyMsg?.current?.scrollIntoView();

    const payload = {
      username: user.username,
      room: chatroom,
    };

    socket.emit("join", payload);

    socket.on("chat", async () => {
      dispatch(getCurrChannel(myChannelUuid)).then(() =>
        dummyMsg?.current?.scrollIntoView()
      );
    });

    socket.on("online", async () => {
      dispatch(getCurrServer(window.location.pathname.split("/")[2]));
    });

    socket.on("offline", async () => {
      dispatch(getCurrServer(window.location.pathname.split("/")[2]));
    });

    return () => {
      const payload = {
        username: user.username,
        room: chatroom,
      };

      socket.emit("leave", payload);
      socket.disconnect();
    };
  }, [dispatch]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    let chatroom = history.location.pathname;

    const payload = {
      user: user.username,
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
    let chatroom = history.location.pathname;

    const payload = {
      // user: user.username,
      // msg: chatInput,
      room: chatroom,
    };
    socket.emit("chat", payload);

    const msgPayload = {
      content: messageContent,
      user_id: user.id,
      channel_id: myChannelId,
    };
    dispatch(createMessage(msgPayload));

    setMessageContent("");
  };

  const eraseMessage = async (e, message) => {
    e.preventDefault();
    console.log(message);
    let chatroom = history.location.pathname;
    const payload = {
      // user: user.username,
      // msg: chatInput,
      room: chatroom,
    };
    socket.emit("chat", payload);

    dispatch(deleteMessage(message.id));
  };

  return (
    <div className="channel__display__container">
      <div className="channel__messages__container">
        <div ref={dummyMsg}></div>
        {Object.values(channelMessages)
          .map((message, ind) =>
            message.user_id == user.id ? (
              <ChannelMessageEdit
                message={message}
                normUsers={normUsers}
                formatDate={formatDate}
                socket={socket}
                user={user}
                eraseMessage={eraseMessage}
                key={message.id}
              ></ChannelMessageEdit>
            ) : (
              <ChannelMessageView
                message={message}
                normUsers={normUsers}
                formatDate={formatDate}
                socket={socket}
                user={user}
                key={message.id}
              ></ChannelMessageView>
            )
          )
          .reverse()}
      </div>
      <form className="channel__chat__form" onSubmit={addMessage}>
        <div className="channel__chat__input__container">
          <div className="channel__add__input"></div>
          <input
            className="channel__chat__input"
            placeholder={`Message #${myChannelName}`}
            required
            maxLength={900}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button className="send__chat__button"></button>
        </div>
      </form>
    </div>
  );
}

export default ChannelDisplay;
