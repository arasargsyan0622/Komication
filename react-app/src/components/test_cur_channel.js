import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCurrChannel} from "../store/current_channel_msg"

const CurrChannel = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ messageContent, setmessageContent ] = useState("")

    const uuid = "baaa1d0c1fab428c809f832629afbd1a"
    const currChannel = Object.values(useSelector((state) => state.current_channel))
    console.log(currChannel)
    const myChannel = currChannel[0]?.channel
    console.log(myChannel)
    const messages = myChannel?.channel_messages
    console.log(messages)

    useEffect(()=>{
        dispatch(getCurrChannel(uuid)).then(()=>setIsLoaded(true))
    }, [dispatch])

    const addMessage = async(e) => {
        e.preventDefault()
        const payload = {
            content: messageContent
        }

        dispatch()
    }
    return (
        isLoaded && (
            <div>
                <div>hello from {myChannel.channel_name}</div>
                {Object.values(messages).map((message)=>{
                    return(
                        <div key={message.id}>
                            <div>MessageId:{message.id}</div>
                            <div>{message.content}</div>
                        </div>
                    )
                })}
            <form onSubmit={addMessage}>
                <input value={messageContent} onChange={(e) => setmessageContent(e.target.value)} placeholder="enter message"></input>
                <button type="submit">send msg</button>
            </form>
            </div>
        )
    )
}

export default CurrChannel
