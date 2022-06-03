import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../../store/current_channel_msg";
import { useHistory } from "react-router-dom";

function ChannelMsgEditForm({ socket, setShowModal, message }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editMessageContent, setEditMessageContent] = useState(message.content);

  console.log(message);

  const editMessage = async (e) => {
    e.preventDefault();
    let chatroom = history.location.pathname;
    const roomWithMe = {
      // user: user.username,
      // msg: chatInput,
      room: chatroom,
    };
    socket.emit("chat", roomWithMe);

    const comment_id = message.id;
    const payload = {
      content: editMessageContent,
      id: comment_id,
    };
    dispatch(updateMessage(payload));
    setShowModal(false);
  };

  return (
    <div>
      <form onSubmit={editMessage}>
        <input
          value={editMessageContent}
          onChange={(e) => setEditMessageContent(e.target.value)}
          placeholder="edit message"
        ></input>
        <button type="submit">Edit Msg</button>
      </form>
    </div>
  );
}

export default ChannelMsgEditForm;
