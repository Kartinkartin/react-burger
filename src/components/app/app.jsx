import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetail from '../ingredient-detail/ingredient-detail';


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
  
  const [ openingOrder, setOpeningOrder ] = React.useState(false);
  const [ openingDetails, setOpeningDetails ] = React.useState(false);
  const [ element, setElement ] = React.useState(null);

  function openOrderDetails() {
    setOpeningOrder(true)
  }
  function openIngridientsDetail(card) {
    setOpeningDetails(true);
    setElement(card);
  }
  function closePopup() {
    setOpeningOrder(false);
    setOpeningDetails(false);
  }

  return (
    <div className={styles.page}>
      <AppHeader />
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
    </div>
  );
}

export default App;
