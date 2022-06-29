import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import TextField from 'material-ui/TextField';

import axios from "axios";
import {Button, FormGroup} from "reactstrap";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

function UploadScreen(props) {
    return null;
}

UploadScreen.propTypes = {};

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    handleClick(event){
        const apiBaseUrl = "http://localhost:3000/auth/";
        const self = this;
        const payload = {
            "username": this.state.username,
            "password": this.state.password
        };
        axios.post(apiBaseUrl+'login', payload)
            .then(function (response) {
                console.log(response);
                if(response.data.code == 200){
                    console.log("Login successfully");
                    const uploadScreen = [];
                    uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
                    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
                }
                else if(response.data.code == 401){
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
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
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default withRouter(Login);