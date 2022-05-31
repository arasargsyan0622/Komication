import React from "react";
import UserServerList from "./UserServerList/UserServerList";

import "./UserHomePage.css";

function UserHomePage() {
  return (
    <div className="user__home__page">
      <UserServerList></UserServerList>
    </div>
  );
}

export default UserHomePage;
