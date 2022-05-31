import "./ServerChannelList.css";
import { NavLink } from "react-router-dom";

function ServerChannelList() {
  let server;
  return (
    <div className="server__channel__list__container">
      <div>
        <NavLink to="/servers/serverId/edit" className={"server__channel__header"}>
          TEXT CHANNELS
        </NavLink>
      </div>

      

      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
      <NavLink className={"server__channel__link"} to="/servers/serverId/channelId">
        # testchannel
      </NavLink>
    </div>
  );
}

export default ServerChannelList;
