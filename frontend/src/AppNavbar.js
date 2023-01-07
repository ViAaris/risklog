import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import './App.css';
import MyLogo from './logo.png';


export default class AppNavbar extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {isOpen: false};
    //     this.toggle = this.toggle.bind(this);
    // }
    //
    // toggle() {
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     });
    // }

    render() {
        return <Navbar className="navbar">
            <NavbarBrand href={"/"}>
                <img src={MyLogo} className={"logo"} alt={"Bygst logo"}/>
            </NavbarBrand>
            {/*<NavbarBrand tag={Link} to="/api/projects">Home</NavbarBrand>*/}
        </Navbar>;
    }
}