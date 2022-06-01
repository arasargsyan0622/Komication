import React, { useEffect, useState } from "react";
import UserServerList from "../UserHome/UserServerList/UserServerList";
import ServerChannelNav from "./ServerChannelNav/ServerChannelNav";
import ChannelDisplay from "../ChannelDisplay/ChannelDisplay";
import ServerSearch from "../Forms/ServerSearch";
import ServerUserCard from "../ServerUserCard/ServerUserCard";
import { useHistory } from "react-router-dom";
import ProtectedRoute from "../Forms/auth/ProtectedRoute";

import "./ServerDisplay.css";

import { useSelector, useDispatch } from "react-redux";
import { getServers } from "../../store/server";
import { getCurrServer } from "../../store/current_server";
import { useParams } from "react-router-dom";

function ServerDisplay() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  let newUuid = useParams().serverUuid;

  useEffect(() => {
    dispatch(getServers()).then(() => {
      if (newUuid)
        dispatch(getCurrServer(newUuid)).then(() => {
          setIsLoaded(true);
        });
    });
  }, [dispatch]);

  //TODO CREATE CURRENT CHANNEL STORE PASS CHANNEL AS PROPS TO CHANNEL DISPLAY
  //TODO AND SERVER CHANNEL NAV AND HEADER & SEARCH
  return (
    isLoaded && (
      <div className="server__display">
        <UserServerList></UserServerList>
        <ServerChannelNav></ServerChannelNav>
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
      </div>
    )
  );
}

export default ServerDisplay;
