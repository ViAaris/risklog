import React, { Component } from 'react';
import './App.css';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';


class Home extends Component {
    render() {
        return (
           
            <div className="body">




                        <button className="btn" > <Link to="/auth/login">Log in</Link></button>
                        <br/>
                        <br/>
                        <br/>
                        <button className="btn" > <Link to="/auth/reg" >Sign up</Link></button>




            </div>
        );
    }
}
export default Home;