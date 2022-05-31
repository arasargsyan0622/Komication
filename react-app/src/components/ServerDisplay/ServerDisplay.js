import React, { useEffect, useState } from "react";
import UserServerList from "../UserHome/UserServerList/UserServerList";
import ServerChannelNav from "./ServerChannelNav/ServerChannelNav";

import "./ServerDisplay.css";

import { useSelector, useDispatch } from "react-redux";
import { getServers } from "../../store/server";
import { getCurrServer } from "../../store/current_server";
import { useParams } from "react-router-dom";

function ServerDisplay() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  let newUuid = useParams().serverUuid;

  useEffect(() => {
    dispatch(getServers()).then(() => {
      if (newUuid)
        dispatch(getCurrServer(newUuid)).then(() => {
          setIsLoaded(true);
        });
    });
  }, [useParams(), dispatch]);

  return (
    isLoaded && (
      <div className="server__display">
        <UserServerList></UserServerList>
        <ServerChannelNav></ServerChannelNav>
      </div>
    )
  );
}

export default ServerDisplay;
