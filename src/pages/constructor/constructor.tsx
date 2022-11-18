
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './constructor.module.css';
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import Modal from '../../components/modal/modal';
import { getLoadingStatus } from '../../services/selectors/selectors';

export const ConstructorPage: FunctionComponent = () => {
    const loading = useSelector(getLoadingStatus);

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </DndProvider>
            {loading &&
                (<Modal title='LOADING...' onClose={() => { } } children={undefined} />)
            }
        </>
    );
}
