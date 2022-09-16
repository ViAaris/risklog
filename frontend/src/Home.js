import React, { Component } from 'react';
import './App.css';

import {Link} from 'react-router-dom';
import {Button, ButtonGroup, Container} from 'reactstrap';


class Home extends Component {
    render() {
        return (
           
            <div className="mt-4">

                <Container fluid>

                    <ButtonGroup>
                        <Button className="button" size="sm" color="primary"> <Link to="/auth/login">Log in</Link></Button>
                        <br/>
                        <br/>
                        <br/>
                        <Button class="button" size="sm" color="danger"> <Link to="/auth/reg">Sign up</Link></Button>
                    </ButtonGroup>


                </Container>
            </div>
        );
    }
}
export default Home;