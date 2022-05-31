import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getServers, editServer, deleteServer } from "../store/server"

const Servers = () => {
    const dispatch = useDispatch()
    const [ newName, setNewName ] = useState("")
    const [ priv, setPriv] = useState(false)
    const [ uuid, setUuid ] = useState("7bcfeba495b547f0a4c29fcc9d036fed")
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
        }
        dispatch(editServer(data))
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
                <button type="submit">Submit</button>
            </form>
            <div>
                <button onClick={destroyServer}>Delete</button>
            </div>
        </div>
    )
}

export default Servers
