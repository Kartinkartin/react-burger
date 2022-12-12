import React from 'react';
import styles from './detail.module.css';
import { IngredientDetail } from '../../components/ingredient-detail/ingredient-detail';

export const IngredientDetailPage = () => {
    return (
        <div className={styles.main}>
            <IngredientDetail />
        </div>
    );
}
