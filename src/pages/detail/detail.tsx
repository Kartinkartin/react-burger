import React, { FunctionComponent } from 'react';
import styles from './detail.module.css';
import { IngredientDetail } from '../../components/ingredient-detail/ingredient-detail';

export const IngredientDetailPage: FunctionComponent = () => {
    return (
        <div className={styles.main}>
            <IngredientDetail />
        </div>
    );
}
