import React, { useEffect, useState } from "react";
import UserServerList from "./UserServerList/UserServerList";
import UserFooterDisplay from "../UserFooterDisplay/UserFooterDisplay";
import InboxSearch from "../Forms/InboxSearch";
import InboxMessageList from "./Inbox/InboxMessageList/InboxMessageList";
import InboxSearchNav from "./Inbox/InboxSearchNav/InboxSearchNav";
import InboxChannelDisplay from "./Inbox/InboxChannelDisplay/InboxChannelDisplay";
import UserHomeLoadingScreen from "../LoadingScreens/UserHomeLoadingScreen";
import "./UserHomePage.css";
import NewInboxChannelForm from "../Forms/NewInboxChannel"
import { useSelector, useDispatch } from "react-redux";
import { getServers } from "../../store/server";
import { getAllUsers } from "../../store/users";

import { io } from "socket.io-client";

let socket;

function UserHomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentInbox, setCurrentInbox] = useState("");
  const [newInboxMade, setNewInboxMade] = useState(false);
  const [currentChannel, setCurrentChannel] = useState("");
  const [please, setPlease] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const allInboxes = useSelector((state) => state?.current_inboxes?.inbox_channels);
  const users = useSelector((state) => state.users);
  const homePageCheck = window.location.pathname;
  const servers = Object.values(useSelector((state) => state.servers));
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
    console.log(homePageCheck, "homepagecheck");
    console.log("home page check inside the use effect on home page");
    const inboxUuId = homePageCheck.split("/")[2];

    if (allInboxes) {
      setPlease(Object.values(allInboxes)?.filter((inbox) => inbox?.inbox_uuid == inboxUuId));
    }
  }, [homePageCheck, newInboxMade]);

  return isLoaded ? (
    <div className="user__home__page">
      <UserServerList servers={servers}></UserServerList>
      <div className="inbox__channel__nav__container">
        {/* <InboxSearch newInboxMade={newInboxMade}></InboxSearch> */}
        <InboxMessageList setCurrentInbox={setCurrentInbox}></InboxMessageList>
        <UserFooterDisplay></UserFooterDisplay>
      </div>
      {homePageCheck === "/me" ? (
        <NewInboxChannelForm
            users={users}
            newInboxMade={newInboxMade}
          ></NewInboxChannelForm>
      ) : (
        <div className="inbox__channel__display__container">
          <InboxSearchNav
            currentChannel={currentChannel}
            setCurrentChannel={currentChannel}
            please={please}
          ></InboxSearchNav>

          <InboxChannelDisplay
            channel={channel}
            please={please}
            setCurrentChannel={setCurrentChannel}
          ></InboxChannelDisplay>
        </div>
      )}
    </div>
  ) : (
    <UserHomeLoadingScreen></UserHomeLoadingScreen>
  );
}

export default UserHomePage;
