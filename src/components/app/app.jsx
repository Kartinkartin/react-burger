import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getApiItems } from '../../services/actions';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiItems())
  }, [dispatch])

  return (
    <main className={styles.page}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>
    </main>
  );
}
export default App;
