import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getCurrentUserInboxes, addCurrentUserInbox } from "../../../../store/direct_messages";

import "./InboxMessageList.css";

function InboxMessageList() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  const [newUser, setNewUser] = useState();
  const inboxChannels = Object.values(useSelector((state) => state.current_inboxes));
  const userId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(getCurrentUserInboxes(userId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  const addInboxChannel = (e) => {
    e.preventDefault();

    const payload = {
      userId,
      newUser,
    };
    dispatch(addCurrentUserInbox(payload));
    setNewUser("");
  };

  return (
    isLoaded && (
      <div className="inbox__message__list__container">
        <div className="inbox__messages__headers">
          <div className="inbox__messages__header__container">
            <div className="inbox__message__icon"></div>
            <div className="inbox__message__header">Messages</div>
          </div>
          <div className="inbox__nitro__header__container">
            <div className="inbox__nitro__icon"></div>
            <div className="inbox__nitro__header">Nitro</div>
          </div>
        </div>
        <div className="direct__message__container">
          <div className="direct__message__header__container">
            <div className="direct__message__header">DIRECT MESSAGES</div>
          </div>
          <>
            {Object.values(inboxChannels[0]).map((inbox) => {
              return (
                <div key={inbox.id}>
                  {/* <div>uuid: {inbox.inbox_uuid}</div> */}
                  <NavLink to={`/me/${inbox.inbox_uuid}`} className="direct__message__nav__link">
                    <div className="direct__message__card">
                      <img className="direct__message__avatar" src={inbox.users.avatar_url}></img>
                      <div className="direct__message__username">{inbox.users.username}</div>
                      <button className="direct__message__hide"></button>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </>
        </div>
      </div>
    )
  );
}

export default InboxMessageList;
