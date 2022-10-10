import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './detail.module.css';
import AppHeader from '../components/app-header/app-header';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import { getApiItems } from '../services/actions';
import IngredientDetail from '../components/ingredient-detail/ingredient-detail';

export const IngredientDetailPage = () => {
    const location = useLocation();
    const chosenId = location.pathname.split('/')[2]; 
    const allElements = useSelector(store => store.ingredientsApi)
    const chosenElement = allElements.filter(el => el._id === chosenId)
    debugger;
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <IngredientDetail element={chosenElement}/>
            </div>
        </main>
    );
}
