import React, { useEffect, useState } from "react";
import UserServerList from "./UserServerList/UserServerList";
import UserFooterDisplay from "../UserFooterDisplay/UserFooterDisplay";
import InboxSearch from "../Forms/InboxSearch";
import InboxMessageList from "./Inbox/InboxMessageList/InboxMessageList";
import InboxSearchNav from "./Inbox/InboxSearchNav/InboxSearchNav";
import InboxChannelDisplay from "./Inbox/InboxChannelDisplay/InboxChannelDisplay";
import UserHomeLoadingScreen from "../LoadingScreens/UserHomeLoadingScreen";
import "./UserHomePage.css";

import { useSelector, useDispatch } from "react-redux";
import { getServers } from "../../store/server";
import { getAllUsers } from "../../store/users";
// import { getCurrServer } from "../../store/current_server";
// import { useParams } from "react-router-dom";

import { io } from "socket.io-client";
import NoTextChannel from "../NoTextChannel/NoTextChannel";

let socket;

function UserHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentInbox, setCurrentInbox] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  console.log(window.location.pathname);
  const homePageCheck = window.location.pathname;
  const servers = Object.values(useSelector((state) => state.servers));

  // let newUuid = useParams().serverUuid;
  let channel;

  useEffect(() => {
    dispatch(getAllUsers());
    let mounted = true;
    let t = setTimeout(() => {
      if (mounted) {
        dispatch(getServers()).then(() => {
          setIsLoaded(true);
        });
      }
    }, 1500);

    socket = io();

    socket.emit("online", user);

    return () => {
      mounted = false;
      clearTimeout(t);
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("working");
  }, [homePageCheck]);

  return isLoaded ? (
    <div className="user__home__page">
      <UserServerList servers={servers}></UserServerList>
      <div className="inbox__channel__nav__container">
        <InboxSearch></InboxSearch>
        <InboxMessageList setCurrentInbox={setCurrentInbox}></InboxMessageList>
        <UserFooterDisplay></UserFooterDisplay>
      </div>
      {homePageCheck === "/me" ? (
        <NoTextChannel></NoTextChannel>
      ) : (
        <div className="inbox__channel__display__container">
          <InboxSearchNav channel={channel}></InboxSearchNav>

          <InboxChannelDisplay
            currentInbox={currentInbox}
            channel={channel}
            setCurrentInbox={setCurrentInbox}
          ></InboxChannelDisplay>
        </div>
      )}
      {/* <div className="inbox__channel__display__container">
        <InboxSearchNav channel={channel}></InboxSearchNav>

        <InboxChannelDisplay channel={channel}></InboxChannelDisplay>
      </div> */}
    </div>
  ) : (
    <UserHomeLoadingScreen></UserHomeLoadingScreen>
  );
}

export default UserHomePage;
