import UserServerCard from "./UserServerCard";
import UserHomeCard from "./UserHomeCard";
import LogoutButton from "../../Forms/auth/LogoutButton";
import UserExploreCard from "./UserExploreCard";
import "./UserServerList.css";
import UserAddServerCard from "./UserAddServerCard";

import { useSelector } from "react-redux";

function UserServerList() {
  const servers = Object.values(useSelector((state) => state.servers));
  const user = useSelector((state) => state.session.user);
  // const ownedServers = servers.filter((server) => server.user_id == user.id);

  const joinedServers = servers.filter((server) => {
    
    const inServer = server.users.filter((checkingUser) => {

      if (checkingUser.id === user.id) {
        return user;
      }

    });

    if (inServer === false) {
      return;
    } else {
      return server;
    }
  });

  return (
    <div className="user__server__list">
      <UserHomeCard
        className={"user__home__card__link"}
        props={user}
      ></UserHomeCard>

      <div className="user__server__list__break__div">
        <div className="user__server__list__break"></div>
      </div>

      {joinedServers.map((server) => {
        return (
          <UserServerCard key={server.id} server={server}></UserServerCard>
        );
      })}

      <UserAddServerCard props={user}></UserAddServerCard>

      <UserExploreCard></UserExploreCard>

      <div className="user__server__list__break__div">
        <div className="user__server__list__break"></div>
      </div>
      <LogoutButton></LogoutButton>
    </div>
  );
}

export default UserServerList;
