// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getCurrentUserInboxes, addCurrentUserInbox } from "../store/direct_messages"

// const CurrInbox = () => {
//     const dispatch = useDispatch()

//     const [ isLoaded, setIsLoaded ] = useState(false)
//     const [newUser, setNewUser] = useState()
//     const currInbox = Object.values(useSelector((state) => state.current_inboxes))
//     const userId = useSelector((state) => state.session.user.id)

//     useEffect(() => {
//         dispatch(getCurrentUserInboxes(userId)).then(() => setIsLoaded(true))
//     }, [dispatch])

//     const addInboxChannel = ((e)=>{
//         e.preventDefault()

//         const payload = {
//             userId,
//             newUser,
//         }
//         // console.log(payload)
//         dispatch(addCurrentUserInbox(payload))
//     })
//     return (
//         isLoaded && (
//             <div>
//                 {Object.values(currInbox[0]).map((inbox) => {
//                     return (
//                         <div key={inbox.id}>
//                             <div>InboxId: {inbox.id}</div>
//                             <div>Username: {inbox.users.username}</div>
//                         </div>
//                     )
//                 })}
//                 <form onSubmit = {addInboxChannel}>
//                     <input onChange={(e)=> setNewUser(e.target.value)} placeholder="user id"></input>
//                     <button type="submit">add inbox channel</button>
//                 </form>
//             </div>
//         )
//     )
// }

// export default CurrInbox
