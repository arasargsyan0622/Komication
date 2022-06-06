import React from "react";
import "./404.css"

function ErrorPage() {
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
