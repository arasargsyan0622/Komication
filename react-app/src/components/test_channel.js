import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { createChannel } from "../store/channel"
import { getCurrServer, createChannel} from "../store/current_server"

const Channels = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [ channelName, setChannelName ] = useState("")

    // const uuid = 1
    const currServer = Object.values(useSelector((state) => state.current_server))
    const server_uuid = "c27ca0cc1cc64ac3abb983b7af80bdf6"
    const myServer = currServer[0]?.server
    // const server_id = myServer?.id
    const serverChannels = currServer[0]?.channels
    console.log("-=-=-=-=-=-", serverChannels)
    useEffect(()=> {
        dispatch(getCurrServer(server_uuid)).then(()=>setIsLoaded(true))
    }, [dispatch])

    const addChannel = async(e) => {
        e.preventDefault()
        const payload = {
            channel_name: channelName,
            myServer
        }

        // dispatch(createChannel(payload)).then(()=>dispatch(getCurrServer(server_uuid))
        dispatch(createChannel(payload))
        setChannelName("")
    }

    return (
        isLoaded && (
            <div>
                {/* <div>Server Name:{currServer[0]?.server.server_name}</div> */}
                <div>Server Name:{myServer.server_name}</div>
                <div>
                    {serverChannels.map((channel)=>{
                        return(
                            <div key={channel.id}>
                                Channel Name: {channel.channel_name}
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={addChannel}>
                    <input value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="Enter channel name"></input>
                    <button type="submit">Create a new channel</button>
                </form>
            </div>
        )
    )
}

export default Channels
