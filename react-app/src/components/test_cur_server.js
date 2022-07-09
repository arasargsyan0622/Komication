import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getCurrServer } from "../store/current_server"
import { editUsername, editEmail, editPhoneNumber, editPassword } from "../store/session";


const CurrServer = () => {
    const dispatch = useDispatch()
    const [userName, setUsername] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPhoneNumber, setNewPhoneNumber] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const username = useSelector((state) => state.session.user?.username)
    const email = useSelector((state) => state.session.user?.email)
    const phone_number = useSelector((state) => state.session.user?.phone_number)
    const user  = useSelector((state) => state.session.user)
    console.log("user in fweyhfuwebfwj", user)

    const submitUsername = (e) => {
        e.preventDefault()
        const payload = {
            userId: user.id,
            username: userName,
        }
        dispatch(editUsername(payload))
    }

    const submitEmail = (e) => {
        e.preventDefault()
        const payload = {
            userId: user.id,
            email: newEmail
        }
        dispatch(editEmail(payload))
    }

    const submitPhoneNumber = (e) => {
        e.preventDefault()
        const payload = {
            userId: user.id,
            phone_number: newPhoneNumber
        }
        dispatch(editPhoneNumber(payload))
    }

    const submitPassword = (e) => {
        e.preventDefault()
        const payload = {
            userId: user.id,
            hashed_password: newPassword
        }
        dispatch(editPassword(payload))
    }

    return (
        <div>
            <form onSubmit={submitUsername}>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Edit Username</button>
            </form>
            <form onSubmit={submitEmail}>
                <input
                    type="text"
                    placeholder="email"
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <button type="submit">Edit Email</button>
            </form>
            <form onSubmit={submitPhoneNumber}>
                <input
                    type="text"
                    placeholder="phone_number"
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <button type="submit">Edit Phone Number</button>
            </form>
            <form onSubmit={submitPassword}>
                <input
                    type="text"
                    placeholder="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">Edit Password</button>
            </form>
            <div>{username}</div>
            <div>{email}</div>
            <div>{phone_number}</div>
        </div>
    )
}

export default CurrServer
