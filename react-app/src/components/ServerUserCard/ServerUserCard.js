import React from "react";

import "./ServerUserCard.css";

function ServerUserCard({ user }) {
  console.log(user)
  return (
    <div className="server__user__card__container">
      <img className="server__user__card__avatar" src={user.avatar_url}></img>
      <div className="server__user__card__name">{user?.username}</div>
    </div>
  );
}

export default ServerUserCard;
