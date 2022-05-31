import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import { useDispatch } from "react-redux"
import { getCurrServer } from "../store/current_server"

const CurrServer = () => {
    const dispatch = useDispatch()
    const id = 1
    useEffect(()=> {
        dispatch(getCurrServer(id))
    }, [dispatch])

    return (
        <div>hello curr server</div>
    )
}

export default CurrServer
