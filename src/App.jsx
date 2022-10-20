import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory, useLocation, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route/protected-route';
import {
    ConstructorPage,
    LoginPage,
    ProfilePage,
    FeedPage,
    ForgotPassPage,
    RegistrationPage,
    ResetPassPage,
    IngredientDetailPage,
    NotFoundPage,
    OrdersPage
} from "./pages";
import Modal from './components/modal/modal';
import IngredientDetail from './components/ingredient-detail/ingredient-detail';
import { deleteError, getApiItems } from './services/actions';

function App() {
    const history = useHistory();
    const location = useLocation();
    let background = location.state?.background;

    const dispatch = useDispatch();
    const error = useSelector(store => store.error)

    function closeIngredientModal(background) {
        history.replace({ pathname: background.pathname })
    }
    function closeErrorModal() {
        dispatch(deleteError())
    }

    useEffect(() => {
        dispatch(getApiItems())
    }, [dispatch])

    // В <Router> обернуто в index, чтобы здесь читался location
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
                 {/* передаю параметр loggedUser, см. ProtectedRoute, он определяет защищенную маршрутизацию */}
                <ProtectedRoute path="/profile" loggedUser={true} exact={true} >
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders" loggedUser={true} exact={true} >
                    <OrdersPage />
                </ProtectedRoute>
                <Route path="/" exact={true}>
                    <ConstructorPage />
                </Route>
                <Route path={`/ingredients/:id`} >
                    <IngredientDetailPage />
                </Route>
                <Route path="/feed" exact={true}>
                    <FeedPage />
                </Route>
                <Route path={`/feed/:id`} exact={true}>
                    <FeedPage />
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
