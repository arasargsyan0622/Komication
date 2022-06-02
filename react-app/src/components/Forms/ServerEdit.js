import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import "./NonAuthFormsCSS/ServerEditForm.css";

import { editServer } from "../../store/server";
import { getCurrServer } from "../../store/current_server";

const ServerEditForm = ({ setShowModal }) => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const currentServer = useSelector((state) => state.current_server);

  const serverUuid = Object.values(currentServer)[0]?.server.server_invite_url;

  const [image, setImage] = useState(
    Object.values(currentServer)[0]?.server.server_icon_url
  );
  const [imageLoading, setImageLoading] = useState(false);
  const [serverName, setServerName] = useState(
    Object.values(currentServer)[0]?.server.server_name
  );
  const [priv, setPriv] = useState(
    Object.values(currentServer)[0]?.server.private
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    const payload = {
      server_name: serverName,
      uuid: serverUuid,
      private: priv,
      image,
    };

    const finishLoad = await dispatch(editServer(payload));
    await dispatch(getCurrServer(serverUuid));

    if (finishLoad) {
      setImageLoading(false);
      setShowModal(false);
      // history.push(`/servers/${finishLoad.server_invite_url}`);
      // window.location.reload(false);
    } else {
      setImageLoading(false);
      console.log("error");
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const changePrivState = async () => {
    if (priv === false) setPriv(true);
    else setPriv(false);
  };

  return (
    <div className="edit__server__container">
      <h1>Server Overview</h1>
      <div className="edit__server__form__container">
        <form className="edit__server__image__form">
          <div>
            <input
              className="edit__server__image__input"
              type="file"
              accept="image/*"
              onChange={updateImage}
            ></input>
            <div className="server__edit__image__min__size">
              Minimum Size:{" "}
              <span className="server__image__min__nums">128x128</span>
            </div>
          </div>
          <div className="server__edit__submit">
            <div className="server__image__recommend">
              We recommend an image of at least 512x512 for the server.
            </div>
            <button
              className="server__edit__image__button"
              onClick={handleSubmit}
            >
              Upload Image
            </button>
          </div>
        </form>
        <form className="edit__server__name__form">
          <label className="edit__server__label" htmlFor="email">
            SERVER NAME
          </label>
          <input
            className="edit__server__name__input"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            type="text"
            placeholder="User's server"
          />
          {priv ? (
            <input
              type="checkbox"
              value={priv}
              onChange={changePrivState}
              defaultChecked
            ></input>
          ) : (
            <input
              type="checkbox"
              value={priv}
              onChange={changePrivState}
            ></input>
          )}
          <button className="edit__server__name__button" onClick={handleSubmit}>
            Update Server
          </button>
        </form>
      </div>
      {imageLoading && <p>Loading...</p>}
      <div className="edit__server__form__break"></div>
      <div>Server Invite Link: === {serverUuid}</div>
    </div>
  );
};

export default ServerEditForm;
