import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../store/current_channel_msg";
import { useHistory } from "react-router-dom";
import ChannelMessageDeleteModal from "../Modals/ChannelMessageDeleteModal";
import "./NonAuthFormsCSS/ChannelMessageEdit.css";
import ChannelMessageView from "../ChannelDisplay/ChannelMessage/ChannelMessageView";

function ChannelMessageEdit({
  message,
  normUsers,
  socket,
  eraseMessage,
  formatDate,
  user,
  setShowModal,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editMessageContent, setEditMessageContent] = useState(message.content);
  const [editActive, setEditActive] = useState(false);
  const [errors, setErrors] = useState([]);


  const editMessage = async (e) => {
    e.preventDefault();
    let chatroom = history.location.pathname;
    setErrors([])
    if (!editMessageContent.length){
      setErrors(["Message cannot be empty select delete to remove message from channel"])
      return
    }
    if (editMessageContent.length>900){
      setErrors(["Message cannot be more than 900 characters"])
      return
    }

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
    setTimeout(() => setEditActive(false), 500);
  };

  return (
    <div>
      {editActive ? (
        <form
          className="channel__message__edit__form"
          onSubmit={(e) => editMessage(e)}
        >
          <img
            className="channel__edit__message__avatar"
            src={user.avatar_url}
            alt="avatar"
          ></img>

          <div className="channel__edit__contents">
            <div className="channel__edit__input__container">
              <div className="channel__edit__message__info">
                <div className="channel__edit__message__user">
                  {normUsers[message?.user_id]?.username}
                </div>
                <div className="channel__edit__message__date">
                  {formatDate(message.timestamp)}
                </div>
                {message.edited === true ? (
                  <div className="edited__confirmation">(edited)</div>
                ) : (
                  <></>
                )}
              </div>
              <div className="channel__message__edit__form__validation__error">
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>

                ))}
              </div>
              <input
                className="channel__message__edit__input"
                // required
                maxLength={901}
                value={editMessageContent}
                onChange={(e) => setEditMessageContent(e.target.value)}
              />
              <div className="edit__cancel__save">
                <span>press to </span>{" "}
                <div
                  onClick={() => {
                    setEditMessageContent(message.content);
                    setEditActive(false);
                  }}
                >
                  {" "}
                  cancel{" "}
                </div>{" "}
                <span> * enter to</span>{" "}
                <div onClick={(e) => editMessage(e)}>save</div>
              </div>
            </div>
          </div>
          <div className="channel__message__edit__buttons">
            {editActive ? (
              <ChannelMessageDeleteModal
                eraseMessage={eraseMessage}
                message={message}
                user={user}
                normUsers={normUsers}
                formatDate={formatDate}
              ></ChannelMessageDeleteModal>
            ) : null}
          </div>
        </form>
      ) : (
        <div className="channel__edit__view__toggle__container">
          <ChannelMessageView
            user={user}
            normUsers={normUsers}
            formatDate={formatDate}
            socket={socket}
            message={message}
          ></ChannelMessageView>
          <div
            className="channel__edit__pencil"
            onClick={() => setEditActive(true)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default ChannelMessageEdit;

// <div>
//   <form onSubmit={editMessage}>
//     <input
//       value={editMessageContent}
//       onChange={(e) => setEditMessageContent(e.target.value)}
//       placeholder="edit message"
//     ></input>
//     <button type="submit">Edit Msg</button>
//   </form>
// </div>
