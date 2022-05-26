import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
// import { useSelector } from "react-redux";

let socket;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const history = useHistory();

  useEffect(() => {
    socket = io();

    let chatroom = window.location.href.split("/")[3];

    const payload = {
      username: "Darren",
      room: chatroom,
    };

    socket.emit("join", payload);

    socket.on("chat", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      console.log("AFTER I LEAVEEEEE???");
      let chatroom = window.location.href.split("/")[3];

      const payload = {
        user: "Darren",
        msg: "I left",
        room: chatroom,
      };

      socket.emit("chat", payload);
      // history.push("/");
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    let chatroom = window.location.href.split("/")[3];

    const payload = {
      user: "Darren",
      msg: chatInput,
      room: chatroom,
    };

    socket.emit("chat", payload);
    setChatInput("");
  };

  const leaveNow = (e) => {
    e.preventDefault();
    let chatroom = window.location.href.split("/")[3];
    const payload = {
      username: "Darren",
      room: chatroom,
    };
    socket.emit("leave", payload);
    history.push("/chatroom_2");
    const newPayload = {
      username: "Vern",
      room: "chatroom_2",
    };
    socket.emit("join", newPayload);
  };

  return (
    <div>
      <form onSubmit={sendChat}>
        <input value={chatInput} onChange={updateChatInput} />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.map((message, ind) => (
          <div key={ind}>{`${message.user}: ${message.msg}`}</div>
        ))}
      </div>
      <button onClick={leaveNow}>Join room 2</button>
    </div>
  );
};

export default Chat;
