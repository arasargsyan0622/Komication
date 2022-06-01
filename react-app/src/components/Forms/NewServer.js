import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import "./NonAuthFormsCSS/NewServerForm.css";

import ServerInviteModal from "../Modals/ServerInviteModal";

import { createServer } from "../../store/server";

const NewServerForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [serverName, setServerName] = useState("");

  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    const payload = {
      image,
      serverName,
      userId: user.id,
    };

    const finishLoad = await dispatch(createServer(payload));

    console.log(finishLoad);
    console.log("hello?????????????");

    if (finishLoad) {
      setImageLoading(false);
      // setShowModal(false);
      history.push(`/servers/${finishLoad.server_invite_url}`);
      window.location.reload(false);
    } else {
      setImageLoading(false);
      console.log("error");
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
      <form className="create__form">
        <input
          className="create__form__image__input"
          input
          type="file"
          accept="image/*"
          onChange={updateImage}
        ></input>
        {imageLoading && <p>Loading...</p>}
        <label className="create__server__label" htmlFor="email">
          SERVER NAME
        </label>
        <input
          className="create__server__name__input"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
          type="text"
          placeholder="User's server"
        />
        <div className="server__invite__link__container">
          Already have an invite link?{" "}
          {/* <Link className="server__invite__link" to="/servers/invite">
            Join a Server.
          </Link> */}
          <ServerInviteModal></ServerInviteModal>
        </div>
      </form>
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
