import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./NonAuthFormsCSS/NewServerForm.css";

import ServerInviteModal from "../Modals/ServerInviteModal";

import { createServer } from "../../store/server";
import { createChannel, getCurrServer } from "../../store/current_server";

import {
  cleanCurrChannel,
  getCurrChannel,
} from "../../store/current_channel_msg";

const NewServerForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const user = useSelector((state) => state.session.user);
  const [serverName, setServerName] = useState(`${user.username}'s Server`);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const payload = {
      image,
      serverName,
      userId: user.id,
    };

    const finishLoad = await dispatch(createServer(payload));

    await dispatch(getCurrServer(finishLoad.server_invite_url));

    const payloadChannel = {
      myServer: finishLoad,
      channel_name: "general",
    };

    const newChannel = await dispatch(createChannel(payloadChannel));

    await dispatch(cleanCurrChannel());
    await dispatch(getCurrChannel(newChannel.channel_uuid));

    if (finishLoad) {
      setImageLoading(false);
      // setShowModal(false);
      history.push(
        `/servers/${finishLoad.server_invite_url}/${newChannel.channel_uuid}`
      );
      window.location.reload(false);
    } else {
      setImageLoading(false);
      // console.log("error");
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="create__server__form__container">
      <div className="create__server__form__heading">
        <h1 className="create__server__header">Customize your server</h1>
        <div className="create__server__message">
          Give your new server a personality with a name and an icon. You can
          always change it later.
        </div>
      </div>
      <form className="create__form" onSubmit={handleSubmit}>
        <input
          className="create__form__image__input"
          type="file"
          accept="image/*"
          onChange={updateImage}
        ></input>
        {imageLoading && <p className="image__upload__loading">Loading...</p>}

        <label className="create__server__label" htmlFor="email">
          SERVER NAME
        </label>
        <div className="server__form__validation__error">
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <input
          className="create__server__name__input"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          type="text"
          required
        />
      </form>
      <div className="server__invite__link__container">
        Already have an invite link?{" "}
        {/* <Link className="server__invite__link" to="/servers/invite">
            Join a Server.
          </Link> */}
        <ServerInviteModal></ServerInviteModal>
      </div>
      <div className="create__server__bottom__buttons">
        <div onClick={() => setShowModal(false)}>Back</div>
        <button className="create__server__button" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default NewServerForm;
