import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCurrChannel, createMessage, deleteMessage, updateMessage} from "../store/current_channel_msg"

const CurrChannel = () => {
    const dispatch = useDispatch()
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ messageContent, setmessageContent ] = useState("")
    const [ editMessageContent, setEditMessageContent ] = useState("")


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
        dispatch(createMessage(payload))
    }

    const editMessage = async(e) => {
        e.preventDefault()
        const comment_id = 16
        const payload = {
            content: editMessageContent,
            id:comment_id
        }
        dispatch(updateMessage(payload))
    }

    const eraseMessage = async(message)=> {
        const message_id = message.id
        dispatch(deleteMessage(message_id))
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
                            <button onClick={(e)=>eraseMessage(message)}>delete</button>

                        </div>
                    )
                })}
            <form onSubmit={addMessage}>
                <input value={messageContent} onChange={(e) => setmessageContent(e.target.value)} placeholder="enter message"></input>
                <button type="submit">send msg</button>
            </form>

            <form onSubmit={editMessage}>
                <input value={editMessageContent} onChange={(e) =>  setEditMessageContent(e.target.value)} placeholder="edit message"></input>
                <button type="submit">edit msg</button>
            </form>
            </div>
        )
    )
}

export default CurrChannel
