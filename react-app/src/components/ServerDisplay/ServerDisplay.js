import React from "react";
import UserServerList from "../UserHome/UserServerList/UserServerList";
import ServerChannelNav from "./ServerChannelNav/ServerChannelNav";

import "./ServerDisplay.css";

function ServerDisplay() {
  return (
    <div className="server__display">
      <UserServerList></UserServerList>
      <ServerChannelNav></ServerChannelNav>
    </div>
  );
}

export default ServerDisplay;
