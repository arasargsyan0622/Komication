import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createServer } from "../store/server";

const CreateServer = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [serverName, setServerName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);

    const payload = {
      image,
      serverName,
      userId: 1,
    };

    const finishLoad = dispatch(createServer(payload));

    if (finishLoad) {
      setImageLoading(false);
      // history.push("/images");
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
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={updateImage} />
      <input
        value={serverName}
        onChange={(e) => setServerName(e.target.value)}
        type="text"
        placeholder="Server Name"
      />
      <button type="submit">Submit</button>
      {imageLoading && <p>Loading...</p>}
    </form>
  );
};

export default CreateServer;
