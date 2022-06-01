import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCurrChannel, createMessage} from "../store/current_channel_msg"

const CurrChannel = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ messageContent, setmessageContent ] = useState("")

    const uuid = "baaa1d0c1fab428c809f832629afbd1a"
    const user = useSelector((state) => state.session.user)
    const currChannel = Object.values(useSelector((state) => state.current_channel))
    const myChannel = currChannel[0]?.channel
    const messages = myChannel?.channel_messages

    useEffect(()=>{
        dispatch(getCurrChannel(uuid)).then(()=>setIsLoaded(true))
    }, [dispatch])

    const addMessage = async(e) => {
        e.preventDefault()
        const payload = {
            content: messageContent,
            user_id: user.id,
            channel_id: myChannel.id
        }
        console.log("this is my payload", payload)
        dispatch(createMessage(payload))
    }

    const deleteMessage = async(e)=> {

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
                            <button onClick={(e)=>deleteMessage(message)}>delete</button>
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
