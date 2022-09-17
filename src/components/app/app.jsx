import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getApiItems, 
        postOrder,
        DELETE_INFO_CHOSEN_INGREDIENT, 
        RESET_ORDER_NUMBER } from '../../services/actions';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiItems())
  }, [dispatch])

  const orderItems = useSelector(store => store.constructorItems.ingredientsConstructor)

  const [ openingOrder, setOpeningOrder ] = React.useState(false);
  const [ openingDetails, setOpeningDetails ] = React.useState(false);

  const chosenItem = useSelector(store => store.chosenIngredient);

  function closePopup(e) {
    setOpeningOrder(false);
    setOpeningDetails(false);
    dispatch({
      type: DELETE_INFO_CHOSEN_INGREDIENT
    })
    dispatch({
      type: RESET_ORDER_NUMBER
    })
  }

  return (
    <main className={styles.page}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.main}>
          <BurgerIngredients props={ [ openingDetails, setOpeningDetails, chosenItem, closePopup ] } />
          <BurgerConstructor props={ [ openingOrder, setOpeningOrder, postOrder, orderItems, closePopup ] } />
        </div>
      </DndProvider>
    </main>
  );
}
export default App;
