import React, { useEffect, useState } from "react";
import UserServerList from "../UserHome/UserServerList/UserServerList";
import ServerChannelNav from "./ServerChannelNav/ServerChannelNav";
import ChannelRightSide from "./ServerChannelNav/ChannelRightSide/ChannelRightSide";

import "./ServerDisplay.css";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getServers } from "../../store/server";
import { getCurrServer } from "../../store/current_server";
import { useParams } from "react-router-dom";
import UserHomeLoadingScreen from "../LoadingScreens/UserHomeLoadingScreen";

function ServerDisplay() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  let newUuid = useParams().serverUuid;

  useEffect(() => {
    let mounted = true;
    let t = setTimeout(() => {
      if (mounted) {
        dispatch(getServers()).then(() => {
          dispatch(getCurrServer(newUuid)).then((res) => {
            if (!res.ok) history.push("/me");
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

  return isLoaded ? (
    <div className="server__display">
      <UserServerList></UserServerList>
      <ServerChannelNav></ServerChannelNav>
      <ChannelRightSide></ChannelRightSide>
    </div>
  ) : (
    <UserHomeLoadingScreen></UserHomeLoadingScreen>
  );
}

export default ServerDisplay;
