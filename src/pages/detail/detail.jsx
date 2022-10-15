import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styles from './detail.module.css';
import AppHeader from '../../components/app-header/app-header';
import IngredientDetail from '../../components/ingredient-detail/ingredient-detail';

export const IngredientDetailPage = () => {
    const location = useLocation();
    const { id } = useParams();
    const allElements = useSelector(store => store.ingredientsApi)
    const chosenElement = allElements.filter(el => el._id === id)
    return (
        <main className={styles.page}>
            <AppHeader />
            <div className={styles.main}>
                <IngredientDetail element={chosenElement}/>
            </div>
        </main>
    );
}
