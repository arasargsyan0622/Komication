import "./ServerChannelList.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useState, useEffect } from "react";

function ServerChannelList() {
  const currentServer = useSelector((state) => state.current_server);
  console.log(currentServer, "hello");
  const [channels, setChannels] = useState(
    Object.values(currentServer)[0]?.channels
  );

  const uuid = Object.values(currentServer)[0]?.server.server_invite_url;

  useEffect(() => {
    setChannels(Object.values(currentServer)[0]?.channels);
  }, [currentServer, channels]);

  return (
    <div className="server__channel__list__container">
      <div>
        <NavLink
          to="/servers/serverId/edit"
          className={"server__channel__header"}
        >
          TEXT CHANNELS
        </NavLink>
      </div>

      {channels?.map((channel) => {
        return (
          <NavLink
            className={"server__channel__link"}
            to={`/servers/${uuid}/channelId`}
          >
            {channel.channel_name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default ServerChannelList;
