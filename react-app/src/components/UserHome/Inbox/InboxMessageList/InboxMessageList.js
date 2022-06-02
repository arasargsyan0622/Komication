import React, { useEffect, useState } from "react";

import "./InboxMessageList.css";

function InboxMessageList() {
  const [setIsLoaded] = useState(false);

  // query all inbox channels/'messages'
  // const servers = Object.values(useSelector((state) => state.servers));

  return (
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
          <button className="new__direct__message__button"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
        <div className="direct__message__card">
          <div className="direct__message__avatar"></div>
          <div className="direct__message__username">UserName</div>
          <button className="direct__message__hide"></button>
        </div>
      </div>
    </div>
  );
}

export default InboxMessageList;
