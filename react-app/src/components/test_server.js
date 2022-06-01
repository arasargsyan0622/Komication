import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getServers, editServer, deleteServer } from "../store/server"

const Servers = () => {
    const dispatch = useDispatch()
    const [ newName, setNewName ] = useState("")
    const [ priv, setPriv] = useState(false)
    const [ uuid, setUuid ] = useState("8")
    const [image, setImage] = useState(null);

    const servers = Object.values(useSelector((state) => state.servers))

    useEffect(() => {
        dispatch(getServers())
    }, [dispatch]);

    const submit = async(e) => {
        e.preventDefault()
        const data = {
            server_name: newName,
            uuid,
            private: priv,
            image
        }
        dispatch(editServer(data))
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const changePrivState = async() => {
        if(priv === false) setPriv(true)
        else setPriv(false)
    }

    const destroyServer = async() => {
        dispatch((deleteServer(uuid)))
    }

    return (
        <div>
            <div>
                {servers.map((server) => {
                return(
                    <div key={server.id}>
                        {server.server_name}
                        <h3>{server.server_invite_url}</h3>
                        {server.users.map((user) => (
                            <div>
                                Users: {user.username}
                            </div>
                        ))}
                    </div>
                )
                })}
            </div>
            <form onSubmit={submit}>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="New Name"></input>
                {priv ? <input type="checkbox" value={priv} onChange={changePrivState} defaultChecked></input> :
                        <input type="checkbox" value={priv} onChange={changePrivState}></input> }
                <input
            type ="file"
            accept="image/*"
            onChange={updateImage}
            />
                <button type="submit">Submit</button>
            </form>
            <div>
                <button onClick={destroyServer}>Delete</button>
            </div>
        </div>
    )
}

export default Servers
