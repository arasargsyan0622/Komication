import "./ServerChannelList.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { getServers, wasInvited } from "../../../../store/server";
import { getCurrServer } from "../../../../store/current_server";
import NewChannelModal from "../../../Modals/NewChannelModal";
import ChannelEditModal from "../../../Modals/ChannelEditModal";
function ServerChannelList() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  let currentServer = useSelector((state) => state.current_server);

  const [channels, setChannels] = useState(Object.values(currentServer)[0]?.channels);

  // const uuid = Object.values(currentServer)[0]?.server.server_invite_url;

  const users = Object.values(currentServer)[0]?.server.users;

  useEffect(() => {
    currentServer = Object.values(currentServer)[0];
    // console.log(currentServer);
    setChannels(Object.values(currentServer.server.channels));
    let was_I_Invited = true;
    users?.forEach((user) => {
      // checks if I am in the server
      if (currentUser.id === user.id) {
        was_I_Invited = false;
      }
    });
    const server_uuid = window.location.pathname.split("/")[2];
    if (was_I_Invited === true && users) {
      const payload = {
        user_id: currentUser.id,
        server_uuid,
      };
      dispatch(wasInvited(payload)).then(() => {
        dispatch(getServers()).then(() => {
          dispatch(getCurrServer(server_uuid));
        });
      });
    }
  }, [dispatch, currentServer]);

  async function UpdateCurrentChannel(channelId) {
    // await dispatch(cleanChannel());
    // dispatch(setCurrentChannel(channelId));
  }

  return (
    <div className="server__channel__list__container">
      <div className="server__channels__container">
        <div className="server__channel__add__container">
          <div className={"server__channel__header"}>TEXT CHANNELS</div>
          <NewChannelModal></NewChannelModal>
        </div>
        {channels?.map((channel) => {
          return (
            <div key={channel.id} className={"server__channel__link"} onClick={() => UpdateCurrentChannel(channel.id)}>
              <div className="server__channel__link__name"># {channel.channel_name}</div>

              <ChannelEditModal className="server__channel__settings__container"></ChannelEditModal>
            </div>
          );
        })}
      </div>
      <div className="server__delete__container">
        <div className="server__delete__heading">Delete Server</div>
        <div className="server__delete__trash"></div>
      </div>
    </div>
  );
}

export default ServerChannelList;
