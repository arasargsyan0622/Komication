import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { createChannel } from "../store/channel"
import { getCurrServer, createChannel, deleteChannel} from "../store/current_server"

const Channels = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [ channelName, setChannelName ] = useState("")

    // const uuid = 1
    const currServer = Object.values(useSelector((state) => state.current_server))
    const server_uuid = "c27ca0cc1cc64ac3abb983b7af80bdf6"
    const myServer = currServer[0]?.server
    const channels = (myServer?.channels)

    useEffect(()=> {
        dispatch(getCurrServer(server_uuid)).then(()=> setIsLoaded(true))
    }, [dispatch])

    const addChannel = async(e) => {
        e.preventDefault()
        const payload = {
            channel_name: channelName,
            myServer
        }
        // dispatch(createChannel(payload)).then(() => dispatch(getCurrServer(server_uuid)))
        dispatch(createChannel(payload))

        setChannelName("")
    }

    const eraseChannel = async(channel)=>{
        console.log(channel)
        const channelUuid = channel.channel_uuid
        const payload = {channelUuid}
        console.log(channelUuid)
        dispatch(deleteChannel(channelUuid))
    }

    return (
        isLoaded && (
            <div>
                <div>Server Name:{myServer?.server_name}</div>
                <div>
                    {Object.values(channels).map((channel)=>{
                        return(
                            <div key={channel.id}>
                                Channel Name: {channel.channel_name}
                                <button onClick={(e)=>eraseChannel(channel)}>delete</button>
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
