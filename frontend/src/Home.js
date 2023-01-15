import React, { Component } from 'react';
import './App.css';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';


class Home extends Component {
    render() {
        return (
           
            <div className="body">




                        <Button className="button" > <Link to="/auth/login">Log in</Link></Button>
                        <br/>
                        <br/>
                        <br/>
                        <Button classname="button" > <Link to="/auth/reg">Sign up</Link></Button>




            </div>
        );
    }
}
export default Home;