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

function UserInboxPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentInbox, setCurrentInbox] = useState("");
  const [newInboxMade, setNewInboxMade] = useState(false);
  const [currentChannel, setCurrentChannel] = useState("");
  const [please, setPlease] = useState({});
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const allInboxes = useSelector((state) => state?.current_inboxes?.inbox_channels);
  // console.log(allInboxes);
  // console.log(Object.values(allInboxes));
  // const allInboxArray = Object?.values(allInboxes);
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
    console.log(homePageCheck, "homepagecheck");
    console.log("home page check inside the use effect on home page");
    const inboxUuId = homePageCheck.split("/")[2];
    // console.log(inboxUuId);

    if (allInboxes) {
      setPlease(Object.values(allInboxes)?.filter((inbox) => inbox?.inbox_uuid == inboxUuId));
      console.log(allInboxes, "alll inboxesssssssss");
      console.log(please[0]);
    }

    // setTimeout(() => {
    //   if (allInboxes) {
    //     setCurrentChannel(Object?.values(allInboxes).filter((channel) => `/me/${channel.inbox_uuid}` == homePageCheck));
    //     // console.log("home page check inside the use effect on home page");
    //     // console.log(currentChannel);
    //   }
    // }, 500);
    // console.log(currentChannel, "current inbox channel");
  }, [homePageCheck, newInboxMade]);

  return isLoaded ? (
    <div className="user__home__page">
      <UserServerList servers={servers}></UserServerList>
      <div className="inbox__channel__nav__container">
        <InboxSearch newInboxMade={newInboxMade}></InboxSearch>
        <InboxMessageList setCurrentInbox={setCurrentInbox}></InboxMessageList>
        <UserFooterDisplay></UserFooterDisplay>
      </div>
      {homePageCheck === "/me" ? (
        <NoTextChannel></NoTextChannel>
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
      {/* <div className="inbox__channel__display__container">
        <InboxSearchNav channel={channel}></InboxSearchNav>

        <InboxChannelDisplay channel={channel}></InboxChannelDisplay>
      </div> */}
    </div>
  ) : (
    <UserHomeLoadingScreen></UserHomeLoadingScreen>
  );
}

export default UserInboxPage;
