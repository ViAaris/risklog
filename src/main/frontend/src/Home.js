import React, {Component} from 'react';
import './App.css';

import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import BottomBar from "./BottomBar";



class Home extends Component {
    render() {
        return (
            <div className="body">

                <div className={"main-page"}>
                    <h1>Welcome to Bygningsstyrelsen's risk log</h1>

                    <div className={"note"}>
                        <h2 >
                            note: this website was created solely for study purposes
                            <br/>
                            and is NOT related to
                            Bygningsstyrelsen (Danish Construction agency)
                        </h2>
                    </div>

                    <div className={"info"}><p>
                        Functionality:
                        <br/>
                        <br/>
                        Authorized users are able to see the information about the projects,
                    <br/>
                        and if they are a part of the project's team, are able to read and edit project's risk log.
                        <br/>
                        The users send request to acquire access to the risk log.
                        <br/>
                        <br/>
                        The administrator manages the access to the risk log and is able to add, edit and delete projects;
                        <br/> has a list of users with ability to delete them.
                    </p></div>
                    <div className={"main-left"}>
                        <h3>Have an account?</h3>
                        <button className="btn"><Link to="/auth/login">Log in</Link></button>
                    </div>
                    <div className={"main-right"}>
                        <h3>Not registered yet?</h3>
                        <button className="btn"><Link to="/auth/reg">Sign up</Link></button>
                    </div>

                </div>


            </div>

        );
    }
}

export default Home;