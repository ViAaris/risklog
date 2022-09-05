import React, { Component } from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import AuthenticationService from './AuthenticationService';
import {Navigate} from "react-router";

class AuthenticatedRoute extends React.Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        }
        else {
            return this.props.history.push('/auth/login')
        }

    }

    // render() {
    //     const Component = this.props.component;
    //     const isAuthenticated = localStorage.getItem('token');
    //
    //     return isAuthenticated ? (
    //         <Component />
    //     ) : (
    //         <Redirect to={{ pathname: '/auth/login' }} />
    //     );
    // }
}

export default withRouter(AuthenticatedRoute)