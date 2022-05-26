import {io} from 'socket.io-client';
import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

let socket;

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    useEffect(() => {
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })

        return (()=> {
            socket.disconnect()
        })
    },[])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", {user: "Darren", msg: chatInput});
        setChatInput("")

    }
    return (
        <div>
            <form onSubmit={sendChat}>
                <input
                value={chatInput}
                onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
            <div>
                {messages.map((message,ind)=>(
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
        </div>

    )
}

export default Chat
