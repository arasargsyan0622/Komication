import React from "react";

import "./ServerUserCard.css";

function ServerUserCard({ user }) {
  return (
    <div className="server__user__card__container">
      <div className="server__user__card__avatar"></div>
      <div className="server__user__card__name">{user}</div>
    </div>
  );
}

export default ServerUserCard;
