import React from "react";
import "../../../ChannelDisplay/ChannelMessage/ChannelMessage.css";

function InboxMessageView({
  message,
  normUsers,
  socket,
  eraseMessage,
  formatDate,
  user,
}) {
  return (
    <div className="channel__message__div" key={message.id}>
      {/* <div className="channel__message__avatar"></div> */}
      <img
        className="channel__message__avatar"
        src={normUsers[message.user_id]?.avatar_url}
        alt="avatar"
      ></img>
      <div className="channel__message__contents">
        <div className="message__user__time">
          <div className="channel__message__username">
            {normUsers[message.user_id]?.username}
          </div>
          <div className="channel__message__date">
            {formatDate(message.timestamp)}
          </div>
          {message.edited === true ? (
            <div className="channel__message__edited">(edited)</div>
          ) : (
            <></>
          )}
        </div>
        <div className="channel__message">{`${message.content}`}</div>
      </div>
      {/* <ChannelMessageView message={message} normUsers={normUsers} formatDate={formatDate}></ChannelMessageView> */}
    </div>
  );
}

export default InboxMessageView;
