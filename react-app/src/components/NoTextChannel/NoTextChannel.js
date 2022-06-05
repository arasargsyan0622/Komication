import React from "react";
import "./NoTextChannel.css";
function NoTextChannel() {
  return (
    <div className="no__text__channel__display">
      <div className="no__text__channel__container">
        <div className="no__text__contents__image"></div>
        <div className="no__text__contents__text">
          <h4>NO TEXT CHANNELS</h4>
          <div>
            You find yourself in a strange place. You don't have access to any text channels, or there are none in the
            server.
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoTextChannel;
