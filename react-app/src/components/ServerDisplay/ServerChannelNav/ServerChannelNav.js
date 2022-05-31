import "./ServerChannelNav.css";
import ServerTitleCard from "./ServerTitleCard";
import ServerChannelList from "./ServerChannelList/ServerChannelList";
import UserFooterDisplay from "../../UserFooterDisplay/UserFooterDisplay";

function ServerChannelNav({ currentServer }) {
  console.log(currentServer);
  let server;
  return (
    <div className="server__channel__nav__container">
      <ServerTitleCard currentServer={currentServer}></ServerTitleCard>
      <ServerChannelList currentServer={currentServer}></ServerChannelList>
      <UserFooterDisplay></UserFooterDisplay>
    </div>
  );
}

export default ServerChannelNav;
