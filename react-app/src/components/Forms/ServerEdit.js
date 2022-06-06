import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./NonAuthFormsCSS/ServerEditForm.css";
import { editServer } from "../../store/server";
import { getCurrServer } from "../../store/current_server";
import ServerDeleteModal from "../Modals/ServerDeleteModal";

const ServerEditForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const currentServer = useSelector((state) => state.current_server);

  const serverUuid = Object.values(currentServer)[0]?.server.server_invite_url;

  const [image, setImage] = useState(Object.values(currentServer)[0]?.server.server_icon_url);
  // console.log(image);
  const [imageLoading, setImageLoading] = useState(false);
  const [serverName, setServerName] = useState(Object.values(currentServer)[0]?.server.server_name);
  const [priv, setPriv] = useState(Object.values(currentServer)[0]?.server.private);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImageLoading(true);

    setErrors([]);
    if (!serverName.length) {
      setErrors(["Server must have a name"]);
      setImageLoading(false);
      return;
    }
    if (serverName.length > 50) {
      setErrors(["Server name cannot be more than 50 characters"]);
      setImageLoading(false);
      return;
    }
    if (typeof image !== "string") {
    }
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
      // console.log("error");
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // const changePrivState = async () => {
  //   if (priv === false) setPriv(true);
  //   else setPriv(false);
  // };

  return (
    <>
      <div className="modal__full">
        <div className="server__edit__nav__container">
          <div className="server__edit__nav">
            <div className="server__nav__header">
              <div className="server__edit__name__display">Server.name</div>
            </div>

            <div className="server__nav__options">
              <div className="server__edit__option" id="hard__code__server__edit">
                Overview
              </div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__nav__break"></div>
            </div>

            <div className="server__nav__header">
              <div className="server__community__display">COMMUNITY</div>
            </div>
            <div className="server__nav__options">
              <div className="server__edit__option__coming__soon">Coming Soon!</div>
              <div className="server__nav__break"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>

              <div className="server__nav__break"></div>

              <div className="server__nav__header">
                <div className="server__community__display">USER MANAGEMENT</div>
                <div className="server__edit__option"></div>
              </div>
              <div className="server__edit__option__coming__soon">Coming Soon!</div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
              <div className="server__edit__option"></div>
            </div>

            <ServerDeleteModal></ServerDeleteModal>
          </div>
        </div>
        <div className="server__edit__container">
          <div className="server__edit__form__container">
            <div className="edit__server__container">
              <h1>Server Overview</h1>
              <div className="edit__server__form__container">
                <form className="edit__server__image__form" onSubmit={(e) => handleSubmit(e)}>
                  <div>
                    <input
                      className="edit__server__image__input"
                      type="file"
                      accept="image/*"
                      onChange={updateImage}
                    ></input>
                    <div className="server__edit__image__min__size">
                      Minimum Size: <span className="server__image__min__nums">128x128</span>
                    </div>
                  </div>
                  <div className="server__edit__submit">
                    <div className="server__image__recommend">
                      We recommend an image of at least 512x512 for the server.
                    </div>
                    <button className="server__edit__image__button" onClick={(e) => handleSubmit(e)}>
                      Upload Image
                    </button>
                  </div>
                </form>
                <form className="edit__server__name__form" onSubmit={(e) => handleSubmit(e)}>
                  <label className="edit__server__label" htmlFor="email">
                    SERVER NAME
                  </label>
                  <div className="server__edit__form__validation__error">
                    {errors.map((error, ind) => (
                      <div key={ind}>{error}</div>
                    ))}
                  </div>
                  <input
                    className="edit__server__name__input"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    type="text"
                    placeholder="User's server"
                  />
                  {/* {priv ? (
                    <input type="checkbox" value={priv} onChange={changePrivState} defaultChecked></input>
                  ) : (
                    <input type="checkbox" value={priv} onChange={changePrivState}></input>
                  )} */}
                </form>
              </div>
              {imageLoading && <p>Loading...</p>}
              <div className="edit__server__form__break"></div>
            </div>
            <div>
              <div className="edit__server__form__break"></div>
              <div className="server__edit__save__container">
                <span>Careful -- check if you have unsaved changes!</span>
                <div className="server__save__buttons__container">
                  <div
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Back
                  </div>
                  <button onClick={(e) => handleSubmit(e)} className="server__edit__save__button">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="full__screen__modal__esc__container" onClick={() => setShowModal(false)}>
            <div onClick={() => setShowModal(false)} className="escape__circle">
              <div onClick={() => setShowModal(false)} className="escape__x"></div>
            </div>
            <div onClick={() => setShowModal(false)} className="escape__text">
              ESC
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServerEditForm;
