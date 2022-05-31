import UserServerCard from "./UserServerCard";
import UserHomeCard from "./UserHomeCard";
import LogoutButton from "../../Forms/auth/LogoutButton";
import UserExploreCard from "./UserExploreCard";
import "./UserServerList.css";
import UserAddServerCard from "./UserAddServerCard";

function UserServerList() {
  let server;
  let user;
  return (
    <div className="user__server__list">
      <UserHomeCard className={"user__home__card__link"} props={user}></UserHomeCard>

      <div className="user__server__list__break__div">
        <div className="user__server__list__break"></div>
      </div>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>
      <UserServerCard props={server}></UserServerCard>

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
