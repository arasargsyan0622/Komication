import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInbox, addMessageThunk, editMessageThunk } from '../store/dir.msg'
import { getCurrentInbox } from "../store/direct_messages"

const DMs = () => {
    const dispatch = useDispatch()

    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ content, setContent ] = useState("")
    // const [ editMessage, setEditMessage ] = useState("")

    const uuid = "4dd7745f900f44f69cefdec53fd57f8b"
    const currMessages = Object.values(useSelector((state) => state.direct_messages))
    // console.log("currMessages", currMessages)

    const userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(getInbox(uuid)).then(() => setIsLoaded(true))
    }, [dispatch, userId])

    const addMessage = async(e) => {
        e.preventDefault()
        const inbox_id = 1
        const payload = {
            content,
            user_id: userId,
            inbox_channel_id: inbox_id
        }
        // console.log("payload --=-=-=-=-=-=-", payload)
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
            {currMessages.map(message => {
                return(
                        <div key={message.id}>
                        <div>User id: {message.user_id}</div>
                        <div>Message id: {message.id}</div>
                        <div>Message: {message.content}</div>
                        <div>Inbox id: {message.inbox_channel_id}</div>
                        <div>------------------------</div>
                    </div>
                )
            })}
            <form onSubmit={addMessage}>
                <input value={content} onChange={e => setContent(e.target.value)} placeholder="Enter your message"></input>
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
