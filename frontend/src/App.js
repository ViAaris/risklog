
import './App.css';

import Registration from './Registration'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
    return (
        <Router>
            <Switch>
                <Route path='/auth/reg' component={Registration}/>
            </Switch>
        </Router>
    )
}
export default App;
