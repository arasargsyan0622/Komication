import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./NonAuthFormsCSS/ServerInviteForm.css";
import { useSelector } from "react-redux";

const ServerInvite = ({ setShowModal }) => {
  const history = useHistory();

  const [serverInvite, setServerInvite] = useState("");
  const [errors, setErrors] = useState();
  const servers = useSelector((state) => state.servers);
  const matchedServer = Object.values(servers).filter(
    (server) => server.server_invite_url == serverInvite
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (matchedServer[0]?.channels[0]?.channel_uuid) {
    //   history.push(
    //     `/servers/${serverInvite}/${matchedServer[0]?.channels[0].channel_uuid}`
    //   );
    //   window.location.reload(false);
    // } else {
    //   history.push(`/servers/${serverInvite}`);
    //   window.location.reload(false);
    // }
     if (matchedServer[0]?.channels[0]?.channel_uuid) {
      history.push(
        `/servers/${serverInvite}/${matchedServer[0]?.channels[0].channel_uuid}`
      );
      window.location.reload(false);
    } else {
      setErrors(["Error with server invite, confirm link and resubmit"])
    }

  };
  return (
    <div className="server__invite__form__container">
      <div className="server__invite__form__heading">
        <h1 className="server__invite__header">Join a Server</h1>
        <div className="server__invite__message">
          Enter an invite below to join an existing server
        </div>
      </div>
      <div className="server__invite__form">
        <form className="server__invite__form">
          <label className="server__invite__label" htmlFor="email">
            INVITE LINK <span>*</span>
          </label>
          <div className="server__invite__form__validation__error">
            {errors?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <input
            className="server__invite__url__input"
            value={serverInvite}
            onChange={(e) => setServerInvite(e.target.value)}
            type="text"
            placeholder="https://Komication/servers/ecafe871d9d34809818eb31a2afff6a3"
          />
        </form>
        <div className="server__invite__link__container">
          <div className="server__invite__mock__heading">
            INVITES SHOULD LOOK LIKE
          </div>
          <div className="server__invite__mock__link">
            https://komication.herokuapp.com/servers/ecafe871d9d34809818eb31a2afff6a3
          </div>
        </div>
      </div>
      <div className="no__invite__redirect">
        <div>
          <div className="no__invite__explore"></div>
          <div className="no__invite__message">
            <h3>Don't have an invite?</h3>
            <div>Check out our public Komication Server</div>
          </div>
          <div className="no__invite__arrow"></div>
        </div>
      </div>
      <div className="server__invite__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Back</div>
        <button className="server__invite__button" onClick={handleSubmit}>
          Join Server
        </button>
      </div>
    </div>
  );
};

export default ServerInvite;
