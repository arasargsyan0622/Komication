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
// import { getCurrServer } from "../../store/current_server";
// import { useParams } from "react-router-dom";

import { io } from "socket.io-client";
import ProtectedRoute from "../Forms/auth/ProtectedRoute";
import { useParams } from "react-router-dom";

let socket;

function UserHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const servers = Object.values(useSelector((state) => state.servers));
  const inboxUuId = window.location.pathname.split("/")[2];
  //dispatch thunk to find the inbox by ID
  // channel comes back pass it in as props to the channel display

  let inboxChannel = true;

  let channel;

  useEffect(() => {
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

  return isLoaded ? (
    <div className="user__home__page">
      <UserServerList servers={servers}></UserServerList>
      <div className="inbox__channel__nav__container">
        <InboxSearch></InboxSearch>
        <InboxMessageList></InboxMessageList>
        <UserFooterDisplay></UserFooterDisplay>
      </div>
      {inboxUuId ? (
        <div className="inbox__channel__display__container">
          <InboxSearchNav channel={channel}></InboxSearchNav>

          <InboxChannelDisplay channel={channel}></InboxChannelDisplay>
        </div>
      ) : null}
    </div>
  ) : (
    <UserHomeLoadingScreen></UserHomeLoadingScreen>
  );
}

export default UserHomePage;
