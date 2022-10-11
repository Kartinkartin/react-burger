import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styles from './detail.module.css';
import AppHeader from '../components/app-header/app-header';
import IngredientDetail from '../components/ingredient-detail/ingredient-detail';

export const IngredientDetailPage = () => {
    const location = useLocation();
    const chosenId = location.pathname.split('/')[2]; 
    const allElements = useSelector(store => store.ingredientsApi)
    const chosenElement = allElements.filter(el => el._id === chosenId)
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <IngredientDetail element={chosenElement}/>
            </div>
        </main>
    );
}
