
import './App.css';

import Registration from './auth/Registration'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProjectList from "./projects/ProjectList";
import AddProject from "./projects/AddProject";
import Risks from "./risks/Risks";
import Users from "./users/Users";

import AuthenticatedRoute from "./auth/AuthenticatedRoute";
import LoginComponent from "./auth/LoginComponent";
import AuthenticationService from "./auth/AuthenticationService";
import {useState} from "react";
import Home from "./Home";

import {Logout} from "./auth/Logout";
import EditProject from "./projects/EditProject";
import AllRequests from "./requests/AllRequests";
import AppNavbar from "./AppNavbar";
import React from 'react';








function App() {




    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationService.isUserLoggedIn());
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    return (
        <Router>

        <AppNavbar/>

            <Switch>

                <Route path='/auth/login' component={LoginComponent}/>
                <Route path='/auth/reg' component={Registration}/>
                <Route path='/perform_logout' component={Logout}/>
                <Route
                    exact
                    path='/'
                    render={(props) =>
                        !isAuthenticated ? (
                            <Home {...props} setAuth={setAuth} />
                        ) : (
                            props.history.push('/api/projects')
                        )
                    }
                />
                <AuthenticatedRoute path='/api/admin/projects/:id' component={EditProject}/>
                <AuthenticatedRoute path='/api/admin/projects' component={AddProject}/>
                <AuthenticatedRoute path='/api/admin/requests' component={AllRequests}/>
                <AuthenticatedRoute path='/api/admin/users' component={Users}/>
                <AuthenticatedRoute path='/api/projects' exact={true} component={ProjectList}/>
                <AuthenticatedRoute path='/api/projects/:id/risks' component={Risks}/>





            </Switch>
        </Router>
    )
}
export default App;
