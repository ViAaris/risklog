import React, {Component} from 'react';
import {Button, Form, FormGroup, NavbarBrand} from 'reactstrap';
import './App.css';
import MyLogo from './logo.png';
import AuthenticationService from "./auth/AuthenticationService";
import {Logout} from "./auth/Logout";


export default class BottomBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin:false
        };

    }
    componentDidMount() {
        if(AuthenticationService.getAuthorities()!=null){
            AuthenticationService.getAuthorities()[0] === "ROLE_ADMIN" ?
                this.setState({isAdmin:true}) :
                this.setState({isAdmin:false})
        }

        };
    render() {


        return <div className="bottom">
        </div>
    }
}