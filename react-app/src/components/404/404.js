import React from "react";
import "./404.css"
import { useEffect } from "react"
import { useHistory } from "react-router-dom";

function ErrorPage() {
    const history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            history.push("/me")
        }, 5000)
    }, [])
    return (
        <div className="container">
            <h1 className="header">
                Sorry, page requested could not be found!
                <p className="second">Check your URL</p>
                <div className="img"></div>
            </h1>
        </div>
    )
}

export default ErrorPage
