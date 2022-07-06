import React from "react";
import PropTypes from 'prop-types';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';

export default function BurgerIngredients( { cards } ) {
    const [current, setCurrent] = React.useState('one');
    const cardsData = cards;
    console.log(cardsData);

    return(
        <section className="ingridients">
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div >
                <MenuCategory cards={cardsData} type='bun' />
                <MenuCategory cards={cardsData} type='sauce' />
                <MenuCategory cards={cardsData} type='main' />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    cards: PropTypes.array.isRequired,
}


function MenuCategory({cards, type}) {
    
    const types = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки'
    } 

    return (
        <>
        <h2 className="title pt-10 pb-6 text text_type_main-medium">{types[type]}</h2>
        <div className="menu pl-4 pr-4">
            {
                cards.filter(prod => prod.type === type)
                .map((card,index) => {
                    return(
                        <Card card={card} key={index} />
                    )
                })
            }
        </div>
        </>
    )
}

function Card(props) {
    return(
      <div className="card" key={props.index}>
          <img src={props.card.image} alt={props.card.name} />
          <p className="text text_type_main-default">{props.card.name}</p>
          <CurrencyIcon />
          <p className="text text_type_main-default">{props.card.price}</p>
      </div>      
    )  
  }