import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route/protected-route';
import {
    ConstructorPage,
    LoginPage,
    ProfilePage,
    ForgotPassPage,
    RegistrationPage,
    ResetPassPage
} from "./pages";

function App() {
    return(
        <Router>
            <Switch>
                <Route path="/login" exact={true} >
                    <LoginPage />
                </Route>
                <Route path="/register" exact={true} >
                    <RegistrationPage />
                </Route>
                <Route path="/forgot-password" exact={true} >
                    <ForgotPassPage />
                </Route>
                <Route path="/reset-password" exact={true} >
                    <ResetPassPage />
                </Route>
                <Route path="/profile" exact={true} >
                    <ProfilePage />
                </Route>
                <Route path="/" exact={true}> {/*потом не забудь поменять путь '/' */}
                    <ConstructorPage />
                </Route>
            </Switch>
        </Router>
        
    )
}
export default App;
