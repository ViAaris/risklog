
import './App.css';

import Registration from './Registration'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from "./Login";
import ProjectList from "./ProjectList";




function App() {

    return (
        <Router>
            <Switch>
                <Route path='/auth/reg' component={Registration}/>
                <Route path='/auth/login' component={Login}/>
                <Route path='/api/projects' exact={true} component={ProjectList}/>
            </Switch>
        </Router>
    )
}
export default App;
