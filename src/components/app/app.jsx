import React, { useEffect } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import { DataContext, OrderContext } from '../../services/appContext';
import { config, getCards, checkRes, postOrderRequest } from '../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiItems, postOrder } from '../../services/actions';



function App() {

  const dispatch = useDispatch();
  const apiItems = useSelector(store => store.ingredientsApi) 
  
  const [cards, setCards] = React.useState([]);
  

  // React.useEffect(()=>{
  //   getCards()
  //   .then(res => checkRes(res))
  //   .then(cards => {
  //     setCards(cards.data);
  //   })
  //   .catch(err => console.log(`Ошибка: ${err}`))
  // }, []);

  useEffect(() => {
    dispatch(getApiItems())
  }, [dispatch])
  
  const [ orderList, setOrderList ] = React.useState([]);
  const [ orderNumber, setOrderNumber ] = React.useState('');

  const orderNum = useSelector(store=>store.order.number);
  const orderItems = useSelector(store => store.ingredientsConstructor)

  const [ openingOrder, setOpeningOrder ] = React.useState(false);
  const [ openingDetails, setOpeningDetails ] = React.useState(false);
  const [ element, setElement ] = React.useState(null);

  // function openOrderDetails() {
  //   postOrderRequest(orderList)
  //   .then(res => checkRes(res))
  //   .then(data => {
  //     setOrderNumber(data.order.number);
  //     setOpeningOrder(true);
  //   })
  //   .catch(err => console.log(`Ошибка: ${err}`));
  // }

  function openOrderDetails() {
    dispatch(postOrder(orderItems));
    setOpeningOrder(true);
  
  }

  function openIngridientsDetail(card) {
    setOpeningDetails(true);
    setElement(card);
  }
  function closePopup(e) {
    setOpeningOrder(false);
    setOpeningDetails(false);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
      <DataContext.Provider value={ {cards, setCards} } >
        <OrderContext.Provider value={ {orderList, setOrderList} } >
        <div className={styles.main}>
          <BurgerIngredients onClick={openIngridientsDetail} />
          <BurgerConstructor onClick={openOrderDetails} />
        </div>
        { openingOrder && 
          <Modal title=' ' onClose={closePopup} number={orderNum}>
            <OrderDetails number={orderNum}/>
          </Modal>
        }
        { openingDetails && 
          <Modal title='Детали заказа' onClose={closePopup} element={element}>
            <IngredientDetail element={element} />
          </Modal>
        }
        </OrderContext.Provider>
      </DataContext.Provider>
    </div>
  );
}
export default App;
