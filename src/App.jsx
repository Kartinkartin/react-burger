import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route/protected-route';
import {
    ConstructorPage,
    LoginPage,
    ProfilePage,
    ForgotPassPage,
    RegistrationPage,
    ResetPassPage,
    IngredientDetailPage,
    NotFoundPage
} from "./pages";
import Modal from './components/modal/modal';
import IngredientDetail from './components/ingredient-detail/ingredient-detail';
import { getApiItems } from './services/actions';
import { RESET_ERROR } from './services/actions/error'; 

function App() {
    const history = useHistory();
    // В <Router> обернуто в index, чтобы здесь читался location
    const location = useLocation();
    let background = location.state?.background;

    const dispatch = useDispatch();
    const error = useSelector(store => store.error)

    function closeIngredientModal(background) {
        history.replace({ pathname: background.pathname })
    }
    function closeErrorModal() {
        dispatch({
            type: RESET_ERROR
        })
    }

    useEffect(() => {
        dispatch(getApiItems())
    }, [dispatch])

    return (
        <div>
            <Switch location={background || location}>
                <ProtectedRoute path="/login" exact={true} >
                    <LoginPage />
                </ProtectedRoute>
                <ProtectedRoute path="/register" exact={true} >
                    <RegistrationPage />
                </ProtectedRoute>
                <ProtectedRoute path="/forgot-password" exact={true} >
                    <ForgotPassPage />
                </ProtectedRoute>
                <ProtectedRoute path="/reset-password" exact={true} >
                    <ResetPassPage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile" loggedUser={true} exact={true} >
                    <ProfilePage />
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <ConstructorPage />
                </Route>
                <Route path={`/ingredients/:id`} >
                    <IngredientDetailPage />
                </Route>
                <Route path="*"  >
                    <NotFoundPage />
                </Route>
            </Switch>
            {background && (
                <Route
                    path={`/ingredients/:id`}
                    children={
                        <Modal
                            title='Детали заказа'
                            onClose={() => closeIngredientModal(background)}>
                            <IngredientDetail />
                        </Modal>
                    }
                />
            )
            }
            {error.code || error.message &&
                <Modal title='Горе не беда, но ... ' onClose={closeErrorModal}>
                    <p className='text text_type_main-default'>
                        {`${error.code}: ${error.message}`}
                    </p>
                </Modal>

            }
        </div>
    )
}
export default App;
