import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from './components/header/header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

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
      console.log(cards);
      setCards(cards.data);
    })
    .catch(err => console.log(`Ошибка: ${err}`))
  }, []);
  
  return (
    <div className="App">
      <AppHeader />
      <div className='main'>
        <BurgerIngredients cards={cards}/>
        <BurgerConstructor />
      </div>
      
    </div>
  );
}

export default App;
