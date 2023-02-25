import React, {Component} from 'react';
import {Button, Form, FormGroup, NavbarBrand} from 'reactstrap';
import './App.css';
import MyLogo from './logo.png';
import AuthenticationService from "./auth/AuthenticationService";
import {Logout} from "./auth/Logout";


export default class AppNavbar extends Component {

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


        return <div className="nav">
            <div className={"navbar"}>
                <NavbarBrand href={"/"}>
                    <img src={MyLogo} className={"logo"} alt={"Bygst logo"}/>

                </NavbarBrand>


                {/*<NavbarBrand tag={Link} to="/api/projects">Home</NavbarBrand>*/}
                <div className="services">
                    <nav className="service">

                        {
                            this.state.isAdmin ?
                            <div className={"admin"}>
                                    <ul>
                                        <li className="links"><a href={"/admin/users"}><span>Users</span></a></li>
                                        <li className="links"><a href={"/admin/requests"}><span>Requests</span></a>
                                        </li>
                                    </ul>
                                </div>
                                : ''
                        }


                    </nav>

                </div>
                <div className={"hello"}>
                    {
                        AuthenticationService.isUserLoggedIn() ?
                            <span>Welcome, {AuthenticationService.getLoggedInUserName()}
                            <form className={"logout"} onSubmit={(e) => Logout(e)}>

                                <button type="submit" className={"btn-logout"}>Logout</button>
                                {' '}

                            </form> </span>:''
                    }
            </div>

            </div>
        </div>


    }
}