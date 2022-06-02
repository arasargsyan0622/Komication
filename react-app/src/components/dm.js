import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessageThunk, editMessageThunk } from '../store/dir.msg'
import { getCurrentInbox } from "../store/direct_messages"

const DMs = () => {
    const dispatch = useDispatch()

    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ message, setMessage ] = useState("")
    // const [ editMessage, setEditMessage ] = useState("")

    const uuid = "4e280b32701240a5abdd92d3bae33410"
    const currInboxes = useSelector((state) => state.current_inboxes)
    // console.log("currInboxes -> channels", currInboxes.inbox_channels)
    const currInbox = currInboxes?.inbox_channels

    let messages
    if(currInbox) {
        messages = Object.values(currInbox)[0].inbox_messages
        // console.log("messages ------ ", messages)
    }

    // cosnt messages = once can get into messages

    const userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(getCurrentInbox(userId)).then(() => setIsLoaded(true))
    }, [dispatch, userId])

    const addMessage = async(e) => {
        e.preventDefault()
        const payload = {
            content: messages,
            user_id: userId,
            inbox_id: currInbox.id
        }
        dispatch(addMessageThunk(payload))
    }

    // const updateMessage = async(e) => {
    //     e.preventDefault()
    //     const id = 1
    //     const payload = {
    //         content: editMessage,
    //         id: id
    //     }
    //     dispatch(editMessageThunk(payload))
    // }

    return (
        isLoaded &&
        <div>
            {messages.map(message => {
                return(
                        <div key={message.id}>
                        <div>User id: {message.user_id}</div>
                        <div>Message id: {message.id}</div>
                        <div>Message: {message.content}</div>
                        <div>------------------------</div>
                    </div>
                )
            })}
            <form onSubmit={addMessage}>
                <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter your message"></input>
                <button type='submit'>Add a message</button>
            </form>
            {/* <form>
            //     <input value={editMessage} onChange={e => setEditMessage(e.target.value)} placeholder="Edit your message"></input>
            //     <button type='submit'>Edit a message</button>
            // </form> */}
        </div>
    )
}

export default DMs
