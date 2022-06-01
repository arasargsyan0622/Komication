import "./ServerChannelNav.css";
import ServerTitleCard from "./ServerTitleCard";
import ServerChannelList from "./ServerChannelList/ServerChannelList";
import UserFooterDisplay from "../../UserFooterDisplay/UserFooterDisplay";

function ServerChannelNav() {
  return (
    <div className="server__channel__nav__container">
      <ServerTitleCard></ServerTitleCard>
      <ServerChannelList></ServerChannelList>
      <UserFooterDisplay></UserFooterDisplay>
    </div>
  );
}

export default ServerChannelNav;
