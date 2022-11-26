import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
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
    OrdersPage,
    OrderDetailPage
} from "../../pages";
import { Modal } from '../modal/modal';
import { IngredientDetail } from '../ingredient-detail/ingredient-detail';
import { 
    deleteError,
    getApiItems, 
} from '../../services/actions';
import { 
    getApiIngredients, 
    getError 
} from '../../services/selectors/selectors';
import { OrdertDetail } from '../order-detail/order-detail';
import { TLocationState } from '../../services/types';
import { useDispatch, useSelector } from '../../services/hooks/hooks';

function App() {
    const history = useHistory();
    const location = useLocation<TLocationState | any>();
    let background = location.state?.background; // для модального окна с ингредиентом
    const dispatch = useDispatch();
    const error = useSelector(getError);
    const ingredientsApi = useSelector(getApiIngredients)

    function closeDetailModal(background: { pathname: string; }) {
        history.replace({ pathname: background.pathname })
    }
    function closeErrorModal() {
        dispatch(deleteError())
    }

    useEffect(() => {
        if(!ingredientsApi.length) {
            dispatch(getApiItems()); // получение всех возможных ингредиентов
        }
    }, [dispatch, ingredientsApi])

    // В <Router> обернуто в index, чтобы здесь читался location
    return (
        <main className={styles.page}>
            <AppHeader />
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
                {/* передаю параметр loggedUser, 
                см. ProtectedRoute, он определяет защищенную маршрутизацию */}
                <ProtectedRoute path="/profile" loggedUser={true} exact={true} >
                    <ProfilePage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders" loggedUser={true} exact={true} >
                    <OrdersPage />
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders/:id" loggedUser={true} exact={true} >
                    <OrderDetailPage />
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
                    <OrderDetailPage />
                </Route>
                <Route path="*"  >
                    <NotFoundPage />
                </Route>
            </Switch>
            {background && (
                <>
                    <Route
                        path={`/ingredients/:id`}
                        children={
                            <Modal
                                title='Детали заказа'
                                onClose={() => closeDetailModal(background!)}>
                                <IngredientDetail />
                            </Modal>
                        }
                    />
                    <Route
                        path={`${background.pathname}/:id`}
                        children={
                            <Modal
                                onClose={() => closeDetailModal(background!)}>
                                <OrdertDetail />
                            </Modal>
                        }
                    />
                </ >
            )
            }
            {(error.code || error.message) &&
                <Modal title='Горе не беда, но ... ' onClose={closeErrorModal}>
                    <p className='text text_type_main-default'>
                        {`${error.code}: ${error.message}`}
                    </p>
                </Modal>

            }
        </main>
    )
}
export default App;
