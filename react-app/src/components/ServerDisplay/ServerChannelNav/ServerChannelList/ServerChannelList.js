import "./ServerChannelList.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

import { getServers, wasInvited } from "../../../../store/server";
import { getCurrServer } from "../../../../store/current_server";

function ServerChannelList() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const currentServer = useSelector((state) => state.current_server);
<<<<<<< HEAD

  const [channels, setChannels] = useState(
    Object.values(currentServer)[0]?.channels
  );
=======
  console.log(currentServer, "hello");
  const [channels, setChannels] = useState(Object.values(currentServer)[0]?.channels);
>>>>>>> main

  const uuid = Object.values(currentServer)[0]?.server.server_invite_url;

  const users = Object.values(currentServer)[0]?.server.users;

  useEffect(() => {
    setChannels(Object.values(currentServer)[0]?.channels);
    let was_I_Invited = true;
    console.log(was_I_Invited);
    users?.forEach((user) => {
      // checks if I am in the server
      if (currentUser.id === user.id) {
        was_I_Invited = false;
        console.log("im in server");
      }
    });
    // if I was invited i dispatch
    // remeber to change back to true ~~!!!!!!!!!!!!
    console.log(users);
    console.log(was_I_Invited);
    if (was_I_Invited === true && users) {
      console.log("invited in use effect");
      // dispatch my self to make the association
      const server_uuid = window.location.pathname.split("/")[2];
      const payload = {
        user_id: currentUser.id,
        server_uuid,
      };
      console.log("here!");
      dispatch(wasInvited(payload)).then(() => {
        dispatch(getServers()).then(() => {
          dispatch(getCurrServer(server_uuid));
        });
      });
    }
  }, [dispatch, currentServer, channels]);

  return (
    <div className="server__channel__list__container">
      <div>
        <NavLink to="/servers/serverId/edit" className={"server__channel__header"}>
          TEXT CHANNELS
        </NavLink>
      </div>

      {channels?.map((channel) => {
        return (
          <NavLink key={channel.id} className={"server__channel__link"} to={`/servers/${uuid}/${channel.channel_uuid}`}>
            # {channel.channel_name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default ServerChannelList;
