import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUserInboxes, addCurrentUserInbox } from "../store/direct_messages"

const CurrInbox = () => {
    const dispatch = useDispatch()

    const [ isLoaded, setIsLoaded ] = useState(false)
    const [newUserId, setNewUserId] = useState()
    const uuid = "4dd7745f900f44f69cefdec53fd57f8b"
    const currInbox = Object.values(useSelector((state) => state.current_inboxes))
    console.log("currInbox ----------", currInbox[0])
    const userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(getCurrentUserInboxes(userId)).then(() => setIsLoaded(true))
    }, [dispatch])

    const addInboxChannel = ((e)=>{
        e.preventDefault()
        const payload = {
            userId,
            newUserId,
        }
        console.log(payload)
        dispatch(addCurrentUserInbox(payload))
    })
    return (
        isLoaded && (
            <div>
                <div>hello from </div>
                {Object.values(currInbox[0]).map((inbox) => {
                    return (
                        <div key={inbox.id}>
                            <div>InboxId: {inbox.id}</div>
                            <div>Username: {inbox.users.username}</div>
                        </div>
                    )
                })}
                <form onSubmit = {addInboxChannel}>
                    <input value={newUserId} onChange={(e)=> setNewUserId(e.target.value)} placeholder="user id"></input>
                    <button type="submit">add inbox channel</button>
                </form>
            </div>
        )
    )
}

export default CurrInbox
