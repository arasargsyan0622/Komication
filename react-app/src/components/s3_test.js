import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import User from "./User";

const CreateServer = () => {
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [serverName, setServerName] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("server_name", serverName)
        formData.append("user_id", 1)
        setImageLoading(true)

        const res = await fetch('/api/servers/', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/images");
        }
        else {
            setImageLoading(false);
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type ="file"
            accept="image/*"
            onChange={updateImage}
            />
            <input value={serverName} onChange={e=> setServerName(e.target.value)} tyoe="text" placeholder="Server Name" />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default CreateServer
