import UserServerCard from "./UserServerCard";
import UserHomeCard from "./UserHomeCard";
import LogoutButton from "../../Forms/auth/LogoutButton";
import NewServerModal from "../../Modals/NewServerModal";
import UserExploreCard from "./UserExploreCard";
import "./UserServerList.css";

import { useSelector } from "react-redux";

function UserServerList() {
  const servers = Object.values(useSelector((state) => state.servers));
  const user = useSelector((state) => state.session.user);
  // const ownedServers = servers.filter((server) => server.user_id == user.id);

  // checks to see if im in any server
  const joinedServers = servers.filter((server) => {
    const inServer = server.users.filter((checkingUser) => {
      if (checkingUser.id === user.id) {
        return user;
      }
    });

    // checks falsy value. inServer is an array and if its empty its falsy.
    if (inServer == false) {
      return;
    } else {
      return server;
    }
  });

  return (
    <div className="user__server__list">
      <UserHomeCard className={"user__home__card__link"} props={user}></UserHomeCard>

      <div className="user__server__list__break__div">
        <div className="user__server__list__break"></div>
      </div>

      {joinedServers.map((server) => {
        return <UserServerCard key={server.id} server={server}></UserServerCard>;
      })}
      <NewServerModal></NewServerModal>

      <UserExploreCard></UserExploreCard>

      <div className="user__server__list__break__div">
        <div className="user__server__list__break"></div>
      </div>
      {/* <LogoutButton></LogoutButton> */}
    </div>
  );
}

export default UserServerList;
