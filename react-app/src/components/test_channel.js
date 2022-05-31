import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createChannel } from "../store/channel"
import { getCurrServer } from "../store/current_server"
import Servers from "./test_server"

const Channels = () => {
    const dispatch = useDispatch()
    const [ channelName, setChannelName ] = useState("")

    const uuid = 1
    const currServer = Object.values(useSelector((state) => state.current_server))
    const server_id = currServer[0]?.server.id
    // console.log("allchannels", allChannels)
    // console.log("channel[0", currServer[0]?.channels)
    const serverChannels = currServer[0]?.channels

    useEffect(()=> {

    }, [dispatch])

    const addChannel = async(e) => {
        e.preventDefault()
        const payload = {
            channel_name: channelName,
            server_id
        }

        dispatch(createChannel(payload))
        setChannelName("")
    }

    return (
        <div>
            <div>text</div>
            <div>
                {serverChannels?.map((channel)=>{
                    return(
                        <div key={channel.id}>
                            {channel.channel_name}
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
}

export default Channels
