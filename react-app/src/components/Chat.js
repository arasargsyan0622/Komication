// import { io } from "socket.io-client";
// import React, { useState, useEffect, useRef } from "react";
// // import NewChannelMessage from "./Forms/NewChannelMessage";
// import { useHistory } from "react-router-dom";

// let socket;

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [chatInput, setChatInput] = useState("");
//   const history = useHistory();
//   // const dummyMsg = useRef();

//   useEffect(() => {
//     socket = io();

//     let chatroom = history.location.pathname;

//     // console.log(chatroom);
//     // dummyMsg.current.scrollIntoView();
//     // let newdate = new Date();
//     // console.log(newdate);

//     const payload = {
//       username: "TestUser",
//       room: chatroom,
//     };

//     socket.emit("join", payload);

//     socket.on("chat", (data) => {
//       // console.log(data);
//       setMessages((messages) => [...messages, data]);
//       // dummyMsg.current.scrollIntoView();
//     });

//     return () => {
//       // console.log("hello");
//       const payload = {
//         username: "TestUser",
//         room: chatroom,
//       };
//       socket.emit("leave", payload);
//       // socket.disconnect();
//     };
//   }, [history]);

//   const updateChatInput = (e) => {
//     setChatInput(e.target.value);
//   };

//   const sendChat = (e) => {
//     e.preventDefault();
//     let chatroom = history.location.pathname;

//     const payload = {
//       user: "TestUser",
//       msg: chatInput,
//       room: chatroom,
//     };

//     socket.emit("chat", payload);
//     setChatInput("");
//   };

//   return (
//     <div className="chat__room__container">
//       <div className="message__container">
//         {messages.map((message, ind) => (
//           <div key={ind}>{`${message.user}: ${message.msg}`}</div>
//         ))}
//         {/* <div ref={dummyMsg}></div> */}
//       </div>
//       <form className="chat__form" onSubmit={sendChat}>
//         <input
//           className="chat_input"
//           value={chatInput}
//           onChange={updateChatInput}
//         />
//       </form>
//     </div>
//   );
// };

// export default Chat;
