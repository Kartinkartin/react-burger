
import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './constructor.module.css';
import AppHeader from '../../components/app-header/app-header';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';

export const ConstructorPage = () => {
    const loading = useSelector(store => store.loading);

    return (
        <main className={styles.page}>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <div className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </DndProvider>
            {loading &&
                (<Modal title='LOADING...' onClose={() => { }} />)
            }
        </main>
    );
}