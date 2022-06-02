import React, { useEffect, useState } from "react";
import UserServerList from "./UserServerList/UserServerList";
import UserFooterDisplay from "../UserFooterDisplay/UserFooterDisplay";
import NewInboxChannelForm from "../Forms/NewInboxChannel";

import "./UserHomePage.css";

import { useSelector, useDispatch } from "react-redux";
import { getServers } from "../../store/server";
import { getCurrServer } from "../../store/current_server";
import { useParams } from "react-router-dom";

function UserHomePage() {
  const [setIsLoaded] = useState(false);

  const servers = Object.values(useSelector((state) => state.servers));
  const dispatch = useDispatch();

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
    <div className="user__home__page">
      <UserServerList servers={servers}></UserServerList>
      <div className="inbox__channel__nav__container">
        <NewInboxChannelForm></NewInboxChannelForm>
        <UserFooterDisplay></UserFooterDisplay>
      </div>
    </div>
  );
}

export default UserHomePage;
