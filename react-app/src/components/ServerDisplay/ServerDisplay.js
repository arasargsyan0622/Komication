import React, { useEffect, useState } from "react";
import UserServerList from "../UserHome/UserServerList/UserServerList";
import ServerChannelNav from "./ServerChannelNav/ServerChannelNav";
import ChannelDisplay from "../ChannelDisplay/ChannelDisplay";
import ServerSearch from "../Forms/ServerSearch";
import ServerUserCard from "../ServerUserCard/ServerUserCard";
// import { useHistory } from "react-router-dom";
// import ProtectedRoute from "../Forms/auth/ProtectedRoute";
import ChannelRightSide from "./ServerChannelNav/ChannelRightSide/ChannelRightSide";

import "./ServerDisplay.css";

import { useDispatch, useSelector } from "react-redux";
import { getServers } from "../../store/server";
import { getCurrServer } from "../../store/current_server";
import { useParams } from "react-router-dom";

function ServerDisplay() {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  const channel = useSelector((state) => state.current_channel);
  // console.log(channel, "hello from here");
  // console.log(newUuid);
  // console.log(channel);

  let newUuid = useParams().serverUuid;

  useEffect(() => {
    let mounted = true;
    let t = setTimeout(() => {
      if (mounted) {
        dispatch(getServers()).then(() => {
          dispatch(getCurrServer(newUuid)).then(() => {
            setIsLoaded(true);
          });
        });
      }
    }, 500);
    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [dispatch, newUuid]);

  //TODO CREATE CURRENT CHANNEL STORE PASS CHANNEL AS PROPS TO CHANNEL DISPLAY
  //TODO AND SERVER CHANNEL NAV AND HEADER & SEARCH
  return isLoaded ? (
    <div className="server__display">
      <UserServerList></UserServerList>
      <ServerChannelNav></ServerChannelNav>
      <ChannelRightSide></ChannelRightSide>
    </div>
  ) : (
    <p>loading.... this is server loading hehe</p>
  );
}

export default ServerDisplay;
