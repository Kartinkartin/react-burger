import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
    ConstructorPage,
    LoginPage,
    ProfilePage,
    RecoveryPassPage,
    RegistrationPage,
    ResetPassPage
} from "./pages";

function App() {
    return(
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <ConstructorPage />
                </Route>
            </Switch>
        </Router>
        
    )
}
export default App;
