import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createChannel } from "../store/channel"
import { getCurrServer } from "../store/current_server"

const Channels = () => {
    const dispatch = useDispatch()
    const [ channelName, setChannelName ] = useState("")
    const id = 1
    const allChannels = Object.values(useSelector((state) => state.current_server))
    console.log("allchannels", allChannels)
    console.log("channel[0", allChannels[0])
    useEffect(()=> {
        dispatch(getCurrServer(id))
    }, [dispatch])

    console.log("this is the component")
    const addChannel = async(e) => {
        e.preventDefault()
        const payload = {
            channel_name: channelName,
            server_id: id
        }

        dispatch(createChannel(payload))
    }

    return (
        <div>
            <form onSubmit={addChannel}>
                <input value={channelName} onChange={(e) => setChannelName(e.target.value)} placeholder="Enter channel name"></input>
                <button type="submit">Create a new channel</button>
            </form>
        </div>
    )
}

export default Channels
