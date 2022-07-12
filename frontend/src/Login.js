import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import TextField from 'material-ui/TextField';

import {Button, Form, FormGroup, Input} from "reactstrap";
import React, { Component } from 'react';
import {Redirect, useHistory, withRouter} from "react-router-dom";



class Login extends Component {

    csrfToken = document.cookie.replace(/(?:(?:^|.*;\s*)XSRF-TOKEN\s*\=\s*([^;]*).*$)|^.*$/, '$1');

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick(event){

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
        const refreshPage = ()=>{
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
           // <meta name="csrf-token" content="{{ csrf_token() }}">
            <div>
                <Form>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        {/*<FormGroup>*/}
                        {/*    <Input type="hidden" name={_csrf.parameterName} value={_csrf.token}/>*/}
                        {/*</FormGroup>*/}
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <FormGroup>
                            <Button color="primary" type="submit" onClick={(event) => this.handleClick(event)}>sign in</Button>{' '}

                        </FormGroup>
                        {/*<RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>*/}
                    </div>
                </MuiThemeProvider>
                </Form>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default withRouter(Login);