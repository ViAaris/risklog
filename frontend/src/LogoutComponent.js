import React, { Component } from 'react'
import {Redirect} from "react-router-dom";
import {Navigate} from "react-router";

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank You for Using Our Application.
                </div>
            </>
        )
    }
}

export default LogoutComponent