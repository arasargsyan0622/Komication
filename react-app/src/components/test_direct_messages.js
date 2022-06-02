import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentInbox } from "../store/direct_messages"

const CurrInbox = () => {
    const dispatch = useDispatch()

    const [ isLoaded, setIsLoaded ] = useState(false)

    const uuid = "4dd7745f900f44f69cefdec53fd57f8b"
    const currInbox = Object.values(useSelector((state) => state.current_inboxes))
    console.log("currInbox ----------", currInbox[0])
    const userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(getCurrentInbox(userId)).then(() => setIsLoaded(true))
    }, [dispatch])

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

            </div>
        )
    )
}

export default CurrInbox
