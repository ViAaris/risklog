import React, { Component } from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import AuthenticationService from './AuthenticationService';
import {Navigate} from "react-router";

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return this.props.history.push('/auth/login')
        }

    }
}

export default withRouter(AuthenticatedRoute)