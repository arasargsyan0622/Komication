import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChannelDisplay from "../../../ChannelDisplay/ChannelDisplay";
import ServerSearch from "../../../Forms/ServerSearch";
import ServerUserCard from "../../../ServerUserCard/ServerUserCard";
import NoTextChannel from "../../../NoTextChannel/NoTextChannel";
import "../../../ServerDisplay/ServerDisplay.css";

import UserHomeLoadingScreen from "../../../LoadingScreens/UserHomeLoadingScreen";

function ChannelRightSide() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [noText, setNoText] = useState(false);
  const [textCheck, setTextCheck] = useState(true);

  const channel = useSelector((state) => state.current_channel);
  const currentChannel = Object.values(channel)[0];

  const server = useSelector((state) => state.current_server);
  const currentServer = Object.values(server)[0];
  console.log(currentChannel, "current channel");
  useEffect(() => {
    let mounted = true;
    let t = setTimeout(() => {
      if (mounted) {
        setIsLoaded(true);
      }
    }, 1500);
  }, [dispatch, channel]);

  return isLoaded && currentServer && currentChannel ? (
    <>
      {" "}
      {currentServer && currentChannel ? (
        <div className="channel__right__side__container">
          {currentChannel ? (
            <div className="server__channel__display">
              <div className="server__header__nav">
                <div className="server__header__name">
                  <div className="server__header__hash"></div>
                  <span>{currentChannel?.channel.channel_name}</span>
                </div>
                <div className="server__search__container">
                  <ServerSearch></ServerSearch>
                </div>
              </div>
              <div className="server__channel__display__container">
                <ChannelDisplay></ChannelDisplay>
                <div className="online__users__container">
                  <div>ONLINE — 0</div>
                  <div>OFFLINE — {currentServer.server.users.length}</div>
                  {currentServer.server.users.map((user, idx) => {
                    return (
                      <div>
                        <ServerUserCard user={user} key={idx}></ServerUserCard>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <NoTextChannel></NoTextChannel>
          )}
        </div>
      ) : (
        <UserHomeLoadingScreen></UserHomeLoadingScreen>
      )}
    </>
  ) : (
    <UserHomeLoadingScreen></UserHomeLoadingScreen>
    // <h1>hello</h1>
  );
}

export default ChannelRightSide;
