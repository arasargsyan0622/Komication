import React, { useState, useEffect, useRef } from "react";
import "./ChannelMessage.css";
import ChannelMessageDeleteModal from "../../Modals/ChannelMessageDeleteModal";

function ChannelMessageView({ message, normUsers, socket, eraseMessage, formatDate, user }) {
  return (
    <div className="channel__message__div" key={message.id}>
      <div className="channel__message__avatar"></div>
      <div className="channel__message__contents">
        <div className="message__user__time">
          <div className="channel__message__username">{normUsers[message.user_id]?.username}</div>
          <div className="channel__message__date">{formatDate(message.timestamp)}</div>
          {message.edited == true ? <div>(edited)</div> : <></>}
        </div>
        <div className="channel__message">{`${message.content}`}</div>
      </div>
      {/* <ChannelMessageView message={message} normUsers={normUsers} formatDate={formatDate}></ChannelMessageView> */}
    </div>
  );
}

export default ChannelMessageView;
