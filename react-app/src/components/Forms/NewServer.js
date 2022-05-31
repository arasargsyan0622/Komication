import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./NonAuthFormsCSS/NewServerForm.css";

const NewServerForm = () => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [serverName, setServerName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("server_name", serverName);
    formData.append("user_id", 1);
    setImageLoading(true);

    const res = await fetch("/api/servers/", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push("/images");
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
          Give your new server a personality with a name and an icon. You can always change it later.
        </div>
      </div>
      <form className="create__form" onSubmit={handleSubmit}>
        <input className="create__form__image__input" input type="file" accept="image/*" onChange={updateImage}></input>
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
          <Link className="server__invite__link" to="/servers/invite">
            Join a Server.
          </Link>
        </div>
      </form>
      <div className="create__server__bottom__buttons">
        <div onClick={() => history.push("/me")}>Back</div>
        <button className="create__server__button" type="submit">
          Create
        </button>
      </div>
    </div>
  );
};

export default NewServerForm;
