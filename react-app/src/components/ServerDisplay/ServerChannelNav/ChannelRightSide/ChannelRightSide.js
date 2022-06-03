import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChannelDisplay from "../../../ChannelDisplay/ChannelDisplay";
import ServerSearch from "../../../Forms/ServerSearch";
import ServerUserCard from "../../../ServerUserCard/ServerUserCard";
import NoTextChannel from "../../../NoTextChannel/NoTextChannel";
import "../../../ServerDisplay/ServerDisplay.css";

function ChannelRightSide() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const channel = useSelector((state) => state.current_channel);
  const currentChannel = Object.values(channel)[0];
  const currServer = Object.values(useSelector((state) => state.current_server))[0];
  const channelName = currentChannel?.channel.channel_name
  const users = currServer.server.users

  useEffect(() => {
    setIsLoaded(true);
  }, [dispatch, channel]);

  return (
    <div className="channel__right__side__container">
      {currentChannel ? (
        <div className="server__channel__display">
          <div className="server__header__nav">
            <div className="server__header__name">
              <div className="server__header__hash"></div>
              <span>{channelName}</span>
            </div>
            <div className="server__search__container">
              <ServerSearch></ServerSearch>
            </div>
          </div>
          <div className="server__channel__display__container">
            <ChannelDisplay></ChannelDisplay>
            <div className="online__users__container">
              <div>SERVER USERS</div>
              {users.map((user) =>{
                return (
                  <div>
                    <ServerUserCard user={user.username}></ServerUserCard>
                  </div>
                )
              })}
              <div>ONLINE</div>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <div>OFFLINE</div>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
              <ServerUserCard></ServerUserCard>
            </div>
          </div>
        </div>
      ) : (
        <NoTextChannel />
      )}
    </div>
  );
}

export default ChannelRightSide;
