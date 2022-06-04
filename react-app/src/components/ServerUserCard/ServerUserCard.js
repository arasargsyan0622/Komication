import React from "react";

import "./ServerUserCard.css";

function ServerUserCard({ user }) {
  return (
    <div className="server__user__card__container">
      <div className="server__user__avatar__container">
        <img className="server__user__card__avatar" src={user.avatar_url} alt="avatar"></img>
        {user.online ? <div className="user__online__status"></div> : <div className="user__offline__status"></div>}
      </div>
      <div className="server__user__card__name">{user?.username}</div>
    </div>
  );
}

export default ServerUserCard;
