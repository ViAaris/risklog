import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService';
import {withRouter} from "react-router-dom";

import {MuiThemeProvider, TextField} from "material-ui";
import {Button, Form, FormGroup} from "reactstrap";
import AppBar from "material-ui/AppBar";

class LoginComponent extends Component {

    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
        }

        this.loginClicked = this.loginClicked.bind(this)
    }


    loginClicked(event) {


        AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);

        const url = "http://localhost:3000/auth/login";
        const options = {
            method: "POST",
            headers: {
                "X-XSRF-TOKEN": this.csrfToken,
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",

            },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            }),
        };
        const refreshPage = () => {
            window.location.reload();
        }
        fetch(url, options)
            .then((response) => response.json())
            .then(this.props.history.push('/api/projects'), refreshPage)
            .then((data) => {

                console.log(data);
            });

    }

    render() {
        return (
            <div>

                {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Successful</div>}

                <Form>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Login"
                            />
                    <TextField
                        hintText="Enter your Username"
                        floatingLabelText="Username" onChange={(event, newValue) => this.setState({username: newValue})}
                    />
                    <TextField
                        type="password"
                        hintText="Enter your password"
                        floatingLabelText="Password" onChange={(event, newValue) => this.setState({password: newValue})}
                    />
                    <FormGroup>
                        <Button type="submit" onClick={(event) => this.loginClicked(event)}>Login</Button>
                    </FormGroup>
                        </div>
                    </MuiThemeProvider>
                </Form>
            </div>
        )
    }
}


export default withRouter(LoginComponent);