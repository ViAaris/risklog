import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService';
import {withRouter} from "react-router-dom";

import {Form} from "reactstrap";


class LoginComponent extends Component {


    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            //showSuccessMessage: false,
            serverMessage: '',
            responseStatus: '',
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
                "Authorization": AuthenticationService.createBasicAuthToken(this.state.username, this.state.password),
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Headers": "Authorization, Content-Type, X-XSRF-TOKEN",
                "Access-Control-Allow-Origin": "http://localhost:3000",
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
                } else if (response.status === 200) {
                    this.setState({loggedIn: true});
                    AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
                }
                this.setState({responseStatus: response.status})
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({serverMessage: data});
                if (this.state.responseStatus === 200) {
                    this.setState({grantedAuthorities: data.grantedAuthorities});
                    AuthenticationService.setAuthorities(this.state.username, data.grantedAuthorities);
                    AuthenticationService.setId(this.state.username, data.id);
                }

            })
            .catch(err => {
                console.log(err)
            });

    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    render() {

        if (this.state.loggedIn === true) {
            window.location.href = '/api/projects';
        }

        return (

            <div className={"body"}>

                {this.state.serverMessage.error}
                <div className={"form-box"}>
                <Form onSubmit={(e) => this.loginClicked(e)}>
                        <label> Login </label>
                        <input placeholder="Username" name="username" value={this.state.username}
                               onChange={this.handleChange}/>
                        <input placeholder="Password" type={"password"} name="password" value={this.state.password}
                               onChange={this.handleChange}/>

                    <button className="btn" type="submit" name="login" value="Login" >Login</button>



                </Form></div>
            </div>

        )

    }

}


export default withRouter(LoginComponent);