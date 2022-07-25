import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import { DataContext, OrderContext } from '../../services/appContext';
import { config } from '../api/api';


function App() {

  const [cards, setCards] = React.useState([]);
  
  async function getCards() {
    return await fetch(`${config.baseUrl}/ingredients`,{
      headers: config.headers
    })
  }

  function checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async function postOrder(orderList) {
    const idList ={ "ingredients": orderList.map(item => item._id) }
    return await fetch(`${config.baseUrl}/orders`, {
      headers: config.headers,
      method: 'POST',
      body:JSON.stringify(idList)
    })
  }

  React.useEffect(()=>{
    getCards()
    .then(res => checkRes(res))
    .then(cards => {
      setCards(cards.data);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }, []);
  
  const [ orderList, setOrderList ] = React.useState([]);
  const [ orderNumber, setOrderNumber ] = React.useState('');
  const [ openingOrder, setOpeningOrder ] = React.useState(false);
  const [ openingDetails, setOpeningDetails ] = React.useState(false);
  const [ element, setElement ] = React.useState(null);

  function openOrderDetails() {
    postOrder(orderList)
    .then(res => checkRes(res))
    .then(data => {
      setOrderNumber(data.order.number);
      setOpeningOrder(true);
    })
    .catch(err => console.log(`Ошибка: ${err}`));
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
          <Modal title=' ' onClose={closePopup} number={orderNumber}>
            <OrderDetails number={orderNumber}/>
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
