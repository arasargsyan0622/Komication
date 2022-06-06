import "./NonAuthFormsCSS/NewInboxChannelForm.css";
import InboxChannelInvite from "../UserHome/Inbox/InboxChannelInvite/InboxChannelInvite";
import { useState, useEffect } from "react";
import { getCurrentUserInboxes, addCurrentUserInbox } from "../../store/direct_messages";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function NewInboxChannelForm({ users, setShowModal }) {
  // setup on change for input field
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [setNewInboxMade] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.session.user);
  //
  // filter through this array of users based on search input
  // if includes send to all users array
  let allUsers = Object.values(users);

  const addInboxChannel = async (newUser) => {
    const userId = loggedInUser.id;
    const payload = {
      userId,
      newUser,
    };
    const res = await dispatch(addCurrentUserInbox(payload));

    if (res.inbox_uuid) {
      history.push(`/me/${res.inbox_uuid}`);
    } else {
      history.push(`/me/${res.message}`);
    }
  };
  //set up use effect on the input field
  useEffect(() => {
    setSearchResults(allUsers.filter((user) => user.username.toLowerCase().includes(searchInput)));
  }, [searchInput]);

  return (
    <div className="create__inbox__channel__container">
      <div className="create__inbox__search__input__container">
        <div className="create__message__header">
          <span>Send a message to a friend!</span>
        </div>
        <span># USERS</span>
        <div className="inbox__users__search__input__container">
          <input
            className="inbox__users__search__input"
            placeholder="Search for users..."
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          ></input>
          <div className="inbox__eye__glass"></div>
        </div>
      </div>
      <div className="create__inbox__search__results__container">
        {searchResults.map((user) => {
          return (
            <InboxChannelInvite
              key={user.id}
              user={user}
              setShowModal={setShowModal}
              addInboxChannel={addInboxChannel}
            ></InboxChannelInvite>
          );
        })}
      </div>
    </div>
  );
}

export default NewInboxChannelForm;
