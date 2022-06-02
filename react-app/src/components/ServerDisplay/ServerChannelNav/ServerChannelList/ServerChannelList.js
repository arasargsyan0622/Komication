import "./ServerChannelList.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import { getServers, wasInvited } from "../../../../store/server";
import { getCurrServer } from "../../../../store/current_server";
import { getCurrChannel } from "../../../../store/current_channel_msg";

import NewChannelModal from "../../../Modals/NewChannelModal";
import ChannelEditModal from "../../../Modals/ChannelEditModal";
import ServerDeleteModal from "../../../Modals/ServerDeleteModal";

function ServerChannelList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  let currentServer = useSelector((state) => state.current_server);
  const serverOwner = Object.values(currentServer)[0]?.server.user_id;
  const channels = useSelector((state) =>
    Object.values(Object.values(state.current_server)[0].server.channels)
  );
  const currentChannelUuid = window.location.pathname.split("/")[3];

  const users = Object.values(currentServer)[0]?.server.users;

  useEffect(() => {
    // currentServer = Object.values(currentServer)[0];

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
          dispatch(getCurrServer(server_uuid)).then(() => {
            dispatch(getCurrChannel(currentChannelUuid));
          });
        });
      });
    }

    if (currentChannelUuid) {
      dispatch(getCurrChannel(currentChannelUuid));
    }
    console.log(
      "hello from server channel display ------------------------------------------------"
    );
  }, [dispatch, currentChannelUuid]);

  return (
    <div className="server__channel__list__container">
      <div className="server__channels__container">
        <div className="server__channel__add__container">
          <div className={"server__channel__header"}>TEXT CHANNELS</div>
          <NewChannelModal></NewChannelModal>
        </div>
        {channels?.map((channel) => {
          return (
            <NavLink
              to={`/servers/${
                Object.values(currentServer)[0].server.server_invite_url
              }/${channel.channel_uuid}`}
            >
              <div key={channel.id} className={"server__channel__link"}>
                <div className="server__channel__link__name">
                  # {channel.channel_name}
                </div>
                <ChannelEditModal className="server__channel__settings__container"></ChannelEditModal>
              </div>
            </NavLink>
          );
        })}
      </div>
      {currentUser.id === serverOwner ? (
        <div className="server__delete__container">
          <ServerDeleteModal />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ServerChannelList;
