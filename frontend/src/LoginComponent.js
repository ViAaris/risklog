import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService';
import {Redirect, withRouter} from "react-router-dom";

import {MuiThemeProvider, TextField} from "material-ui";
import {Button, Form, FormGroup} from "reactstrap";
import AppBar from "material-ui/AppBar";
import Cookies from 'js-cookie';
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import {getCSRFToken} from "./getCSRFToken";
import {Navigate} from "react-router";
import {useHistory} from "react-router-dom"

class LoginComponent extends Component {

    csrfToken = getCSRFToken('XSRF-TOKEN');


    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            //showSuccessMessage: false,
            serverMessage: '',
            loggedIn: false,
            grantedAuthorities: []

        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }


    loginClicked(event) {
        // AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);

        event.preventDefault();
        // AuthenticationService
        //     .executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //         this.props.history.push(`/api/projects`)
        //     })
        //     .catch(() => {
        //     this.setState({ showSuccessMessage: false })
        //     this.setState({ hasLoginFailed: true })
        // })
        const options = {
            method: "POST",
            withCredentials: true,
            headers: {
               // "X-XSRF-TOKEN": this.csrfToken,
                "Authorization": AuthenticationService.createBasicAuthToken(this.state.username, this.state.password),
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                 "Access-Control-Allow-Headers":"Authorization, Content-Type, X-XSRF-TOKEN",
                "Access-Control-Allow-Origin": "http://localhost:3000",
                // "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            }),
        };


        fetch('/auth/login', options)
            .then((response) => {
                if (response.status >= 400 && response.status < 600) {
                    this.setState({hasLoginFailed: true})
                }
                else if(response.status === 200){
                    this.setState({loggedIn: true});
                    AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                }
                return response.json();
            })
            .then(data => {
            console.log(data);
            this.setState({ serverMessage: data});
            this.setState({grantedAuthorities: data.grantedAuthorities});
            AuthenticationService.setAuthorities(this.state.username, data.grantedAuthorities);
        })
            .catch(err => {
                console.log(err)
            });

    }
    handleChange = (event) =>{
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    render() {

        if (this.state.loggedIn === true){
            window.location.href = '/api/projects';
        }

        return (



            <div>

                {this.state.serverMessage.error}
                <Form onSubmit={(e) => this.loginClicked(e)}>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Login"
                            />

                            <TextField
                                hintText="Enter your Username"
                                floatingLabelText="Username"
                                name="username"
                                value={this.state.username} onChange={this.handleChange}
                            />
                            <TextField
                                type="password"
                                hintText="Enter your password"
                                floatingLabelText="Password"
                                name="password"
                                value={this.state.password} onChange={this.handleChange}
                            />

                            <FormGroup>
                                <Button color="primary" type="submit">Save</Button>{' '}
                            </FormGroup>

                        </div>
                    </MuiThemeProvider>
                </Form>
            </div>

        )

    }

}


export default withRouter(LoginComponent);