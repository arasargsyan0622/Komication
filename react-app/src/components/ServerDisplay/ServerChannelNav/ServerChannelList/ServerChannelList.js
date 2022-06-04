import "./ServerChannelList.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import { getServers, wasInvited } from "../../../../store/server";
import { getCurrServer } from "../../../../store/current_server";
import {
  getCurrChannel,
  cleanCurrChannel,
} from "../../../../store/current_channel_msg";

import NewChannelModal from "../../../Modals/NewChannelModal";
import ChannelEditModal from "../../../Modals/ChannelEditModal";
// import ServerDeleteModal from "../../../Modals/ServerDeleteModal";

let socket;

function ServerChannelList({ server, channelChange, setChannelChange }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.user);
  const currentServer = useSelector((state) => state.current_server);
  const allServers = useSelector((state) => state.servers);
  const serverOwner = Object.values(currentServer)[0]?.server.user_id;

  // const [allChannels, setAllChannels] = useState("");
  // useEffect(() => {
  //   const test = Object?.values(currentServer)[0]?.server?.channels;
  //   console.log(currentServer);
  //   console.log(test, "========= test");
  //   setAllChannels(test);
  //   console.log(allChannels);
  // }, [allChannels]);

  const channelsObj = Object.values(server)[0]?.server?.channels;
  const currentChannelUuid = window.location.pathname.split("/")[3];

  const users = Object.values(currentServer)[0]?.server.users;

  useEffect(() => {
    let was_I_Invited = true;
    users?.forEach((user) => {
      // checks if I am in the server
      if (currentUser.id === user.id) {
        was_I_Invited = false;
      }
    });
    const server_uuid = window.location.pathname.split("/")[2];
    // console.log(allServers);

    const invalidUrl = Object.values(allServers).filter(
      (server) => server.server_invite_url === server_uuid
    );
    // console.log(invalidUrl);
    if (!invalidUrl.length) history.push("/");

    if (was_I_Invited === true && users) {
      const payload = {
        user_id: currentUser.id,
        server_uuid,
      };
      dispatch(wasInvited(payload)).then(() => {
        socket = io();

        socket.emit("online", currentUser);

        dispatch(getServers()).then(() => {
          socket.disconnect();
          try {
            // console.log("hello");
            dispatch(getCurrServer(server_uuid)).then((res) => {
              if (!res.ok) {
                history.push("/me");
                return;
              }
              dispatch(getCurrChannel(currentChannelUuid));
            });
          } catch (error) {
            // console.log("hello");
            history.push("/");
          }
        });
      });
    }

    if (currentChannelUuid) {
      dispatch(getCurrChannel(currentChannelUuid));
    }

    // const channelUuid = Object?.values(
    //   Object?.values(currentServer)[0]?.server.channels
    // )[0]?.channel_uuid;
    // if (channelUuid) {
    //   history.push(`/servers/${server_uuid}/${channelUuid}`);
    // }

    return () => {
      dispatch(cleanCurrChannel());
    };
  }, [dispatch, currentChannelUuid]);

  return (
    <div className="server__channel__list__container">
      <div className="server__channels__container">
        <div className="server__channel__add__container">
          <div className={"server__channel__header"}>TEXT CHANNELS</div>
          {currentUser?.id === serverOwner ? (
            <NewChannelModal></NewChannelModal>
          ) : (
            <></>
          )}
        </div>
        {Object?.values(channelsObj)?.map((channel) => {
          return (
            <NavLink
              key={channel.id}
              className={"channel__nav__link"}
              onClick={() => setChannelChange(true)}
              to={`/servers/${
                Object.values(currentServer)[0].server.server_invite_url
              }/${channel.channel_uuid}`}
            >
              <div key={channel.id} className={"server__channel__link"}>
                <div className="server__channel__link__name">
                  <span>#</span>
                  {` `}
                  <div>{`${channel.channel_name}`}</div>
                </div>
                {currentUser.id === serverOwner ? (
                  <ChannelEditModal
                    channel={channel}
                    className="server__channel__settings__container"
                  ></ChannelEditModal>
                ) : (
                  <></>
                )}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default ServerChannelList;
