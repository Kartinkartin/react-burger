import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetail from '../ingredient-detail/ingredient-detail';
import { DataContext, OrderContext } from '../../services/appContext';
import { ConfigPost } from '../api/api';


function App() {
  const config ={
    baseUrl: 'https://norma.nomoreparties.space/api/ingredients',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const [cards, setCards] = React.useState([]);
  
  async function getCards() {
    return await fetch(`${config.baseUrl}`,{
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
    return await fetch(`${ConfigPost.baseUrl}`, {
      method: ConfigPost.method,
      headers: ConfigPost.headers,
      body: JSON.stringify(orderList)
    })
  }

  React.useEffect(()=>{
    getCards()
    .then(res=> {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(cards => {
      setCards(cards.data);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }, []);
  
  const [ orderList, setOrderList ] =React.useState([]);
  const [ openingOrder, setOpeningOrder ] = React.useState(false);
  const [ openingDetails, setOpeningDetails ] = React.useState(false);
  const [ element, setElement ] = React.useState(null);

  function openOrderDetails() {
    setOpeningOrder(true)
  }
  function openIngridientsDetail(card) {
    //туть делать запрос
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
          <BurgerIngredients cards={cards} onClick={openIngridientsDetail} />
          <BurgerConstructor cards={cards} onClick={openOrderDetails} />
        </div>
        <div id="modals"></div>
        { openingOrder && 
          <Modal title=' ' onClose={closePopup}>
            <OrderDetails />
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
