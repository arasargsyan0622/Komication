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
              <span>Channel Name</span>
            </div>
            <div className="server__search__container">
              <ServerSearch></ServerSearch>
            </div>
          </div>
          <div className="server__channel__display__container">
            <ChannelDisplay></ChannelDisplay>
            <div className="online__users__container">
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
