
import './App.css';

import Registration from './Registration'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login";
import ProjectList from "./ProjectList";
import AddProject from "./AddProject";
import Risks from "./Risks";
import OneRisk from "./OneRisk";
import AuthenticatedRoute from "./AuthenticatedRoute";
import MenuComponent from "./MenuComponent";
import LoginComponent from "./LoginComponent";
import AuthenticationService from "./AuthenticationService";
import {useState} from "react";
import {Navigate} from "react-router";
import Home from "./Home";
import AddNewRisk from "./AddNewRisk";





function App() {


    const [isAuthenticated, setIsAuthenticated] = useState(AuthenticationService.isUserLoggedIn());
    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    return (
        <Router>
            <Switch>
                <Route path='/auth/reg' component={Registration}/>
                <Route path='/auth/login' component={LoginComponent}/>
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

                <AuthenticatedRoute path='/api/projects/:id' component={Risks}/>
                <AuthenticatedRoute path='/api/projects/:id/risks' component={AddNewRisk}/>
                <AuthenticatedRoute path='/api/projects/:id/risks/:riskId' component={OneRisk}/>
                <AuthenticatedRoute path='/api/projects' exact={true} component={ProjectList}/>
                <AuthenticatedRoute path='/api/admin/new_project' component={AddProject}/>

            </Switch>
        </Router>
    )
}
export default App;
