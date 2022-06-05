import "./ServerChannelNav.css";
import ServerTitleCard from "./ServerTitleCard";
import ServerChannelList from "./ServerChannelList/ServerChannelList";
import UserFooterDisplay from "../../UserFooterDisplay/UserFooterDisplay";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCurrServer } from "../../../store/current_server";
import UserHomeLoadingScreen from "../../LoadingScreens/UserHomeLoadingScreen";
import ChannelListLoadingScreen from "../../LoadingScreens/ChannelListLoadingScreen";
import ChannelNavLoadingScreen from "../../LoadingScreens/ChannelNavLoadingScreen";

function ServerChannelNav({ server }) {
  // const server = useSelector((state) => state.current_server);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);
  // let channels;
  const [channelChange, setChannelChange] = useState("");
  const server_uuid = window.location.pathname.split("/")[2];
  // console.log(server_uuid, "current server in channel nav");
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
      // console.log("inside set timeout");
    }, 1000);
    try {
      // console.log("inside the try block on server channel");
      dispatch(getCurrServer(server_uuid)).then((res) => {
        if (!res.ok) history.push("/me");
      });
    } catch (e) {
      // console.log("in the catch");
      // history.push("/");
    }
  }, [dispatch]);
  // setIsLoaded(false);
  // console.log(isLoaded);
  return (
    <div className="server__channel__nav__container">
      {isLoaded ? (
        <>
          <ServerTitleCard></ServerTitleCard>
          <ServerChannelList
            server={server}
            channelChange={channelChange}
            setChannelChange={setChannelChange}
          ></ServerChannelList>
        </>
      ) : (
        <ChannelNavLoadingScreen></ChannelNavLoadingScreen>
      )}

      <UserFooterDisplay></UserFooterDisplay>
    </div>
  );
}

export default ServerChannelNav;
