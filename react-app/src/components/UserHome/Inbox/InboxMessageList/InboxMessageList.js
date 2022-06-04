import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserInboxes, addCurrentUserInbox } from "../../../../store/direct_messages"


import "./InboxMessageList.css";

function InboxMessageList() {
  const dispatch = useDispatch()

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ newUser, setNewUser ] = useState()
  const currInbox = Object.values(useSelector((state) => state.current_inboxes))
  const userId = useSelector((state) => state.session.user.id)
  // const inboxUuid = Object.values(currInbox[0]).map((inbox) => {
  //   if (inbox) {
  //     return inbox?.inbox_uuid
  //   }
  // })
  // console.log("---------", inboxUuid)

    useEffect(() => {
        dispatch(getCurrentUserInboxes(userId)).then(() => setIsLoaded(true))
    }, [dispatch])

    const addInboxChannel = ((e)=>{
        e.preventDefault()

        const payload = {
            userId,
            newUser,
        }
        dispatch(addCurrentUserInbox(payload))
        setNewUser("")
    })

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
          <form onSubmit={addInboxChannel}>
              <div className="direct__message__header">DIRECT MESSAGES</div>
              <input onChange={(e)=> setNewUser(e.target.value)} placeholder="Enter username"></input>
              <button className="new__direct__message__button" type="submit"></button>
          </form>
        </div>
        <>
          {Object.values(currInbox[0]).map((inbox) => {
              return (
                  <div key={inbox.id}>
                      <div>uuid: {inbox.inbox_uuid}</div>
                      <div className="direct__message__avatar"></div>
                      <div className="direct__message__username">{inbox.users.username}</div>
                  </div>
              )
          })}
        </>
      </div>
    </div>
    )
  );
}

export default InboxMessageList;
