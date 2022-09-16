import React, { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import { useDispatch, useSelector } from 'react-redux';
import { getApiItems, 
        postOrder,
        GET_INFO_CHOSEN_INGREDIENT, 
        DELETE_INFO_CHOSEN_INGREDIENT, 
        RESET_ORDER_NUMBER } from '../../services/actions';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiItems())
  }, [dispatch])

  const orderNum = useSelector(store=>store.order.number).toString();
  const orderItems = useSelector(store => store.constructorItems.ingredientsConstructor)

  const [ openingOrder, setOpeningOrder ] = React.useState(false);
  const [ openingDetails, setOpeningDetails ] = React.useState(false);

  const chosenItem = useSelector(store => store.chosenIngredient);


  function openOrderDetails() {
    dispatch(postOrder(orderItems));
    setOpeningOrder(true);
  }

  function openIngridientsDetail(card) {
    dispatch({
      type: GET_INFO_CHOSEN_INGREDIENT,
      item: card
    })
    setOpeningDetails(true);
  }
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
    <div className={styles.page}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.main}>
          <BurgerIngredients onClick={openIngridientsDetail} />
          <BurgerConstructor onClick={openOrderDetails} />
        </div>
      </DndProvider>
      { openingOrder && 
        <Modal title=' ' onClose={closePopup} number={orderNum}>
          <OrderDetails number={orderNum}/>
        </Modal>
      }
      { openingDetails && 
        <Modal title='Детали заказа' onClose={closePopup} element={chosenItem}>
          <IngredientDetail element={chosenItem} />
        </Modal>
      }
    </div>
  );
}
export default App;
