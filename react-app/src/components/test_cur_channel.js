import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import {getCurrChannel} from "../store/current_channel"

const CurrChannel = () => {
    const dispatch = useDispatch()
    const id = 1
    useEffect(()=>{
        dispatch(getCurrChannel(id))
    }, [dispatch])

    return (
        <div>hello curr channel</div>
    )
}

export default CurrChannel
