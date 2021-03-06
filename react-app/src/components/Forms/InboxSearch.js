import "./NonAuthFormsCSS/InboxSearch.css";
import { useSelector } from "react-redux";
import { useState } from "react";

import { Modal } from "../../context/Modal";
import NewInboxChannelForm from "./NewInboxChannel";

function InboxSearch({ newInboxMade }) {
  const users = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  // console.log(users);

  return (
    <div className="inbox__search__container">
      <input
        className="direct__message__search"
        placeholder="Send a Direct Message"
        type="text"
        onFocus={() => setShowModal(true)}
      ></input>
      {showModal && (
        <Modal>
          <NewInboxChannelForm
            users={users}
            setShowModal={setShowModal}
            newInboxMade={newInboxMade}
          ></NewInboxChannelForm>
        </Modal>
      )}
    </div>
  );
}

export default InboxSearch;
