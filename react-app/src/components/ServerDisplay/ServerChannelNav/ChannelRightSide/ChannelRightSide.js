import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChannelDisplay from "../../../ChannelDisplay/ChannelDisplay";
import ServerSearch from "../../../Forms/ServerSearch";
import ServerUserCard from "../../../ServerUserCard/ServerUserCard";
import NoTextChannel from "../../../NoTextChannel/NoTextChannel";
import "../../../ServerDisplay/ServerDisplay.css";

// import { getCurrChannel } from "../../../../store/current_channel_msg";

// import UserHomeLoadingScreen from "../../../LoadingScreens/UserHomeLoadingScreen";
import ChannelLoadingScreen from "../../../LoadingScreens/ChannelLoadingScreen";
// import { useParams } from "react-router-dom";

function ChannelRightSide({ channel }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  // const [textCheck, setTextCheck] = useState(false);

  // const channel = useSelector((state) => state.current_channel);
  const currentChannel = Object.values(channel)[0];

  const server = useSelector((state) => state.current_server);
  const currentServer = Object.values(server)[0];

  const onlineUsers = currentServer.server.users.filter((user) => user.online === true);

  const offlineUsers = currentServer.server.users.filter((user) => user.online === false);

  const channelUuid = window.location.pathname.split("/")[3];

  useEffect(() => {
    let mounted = true;
    let t = setTimeout(() => {
      if (mounted) {
        // if (window.location.pathname.split("/")[3]) {
        //   dispatch(getCurrChannel(window.location.pathname.split("/")[3])).then(
        //     () => {
        setIsLoaded(true);
        //       }
        //     );
        //   }
      }
    }, 500);
    return () => {
      clearTimeout(t);
    };
  }, [dispatch, channelUuid]);

  return isLoaded && currentServer && currentChannel ? (
    <>
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
                  <div>ONLINE — {onlineUsers.length}</div>
                  {onlineUsers.map((user, idx) => {
                    return (
                      <div key={user.id}>
                        <ServerUserCard user={user} key={user.id}></ServerUserCard>
                      </div>
                    );
                  })}
                  <div>OFFLINE — {offlineUsers.length}</div>
                  {offlineUsers.map((user, idx) => {
                    return (
                      <div key={user.id}>
                        <ServerUserCard user={user} key={user.id}></ServerUserCard>
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
        <ChannelLoadingScreen></ChannelLoadingScreen>
        // <UserHomeLoadingScreen></UserHomeLoadingScreen>
      )}
    </>
  ) : (
    <ChannelLoadingScreen></ChannelLoadingScreen>
    // <h1>hello</h1>
  );
}

export default ChannelRightSide;
