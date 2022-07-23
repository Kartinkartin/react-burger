import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import { DataContext } from "../../services/appContext";

export default function BurgerIngredients( { onClick } ) {
    const [current, setCurrent] = React.useState('one');
    const {cards} = useContext(DataContext);
    const cardsData = cards;

    return(
        <section className={styles.ingridients}>
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
            <div className={styles.menu}>
                <MenuCategory cards={cardsData} type='bun' onClick={onClick} />
                <MenuCategory cards={cardsData} type='sauce' onClick={onClick} />
                <MenuCategory cards={cardsData} type='main' onClick={onClick} />
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    cards: PropTypes.array.isRequired,
}


function MenuCategory({cards, type, onClick}) {
    const types = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки'
    }
    return (
        <>
        <h2 className={styles.title + " pt-10 pb-6 text text_type_main-medium"}>{types[type]}</h2>
        <div className={styles.category + " " + "pl-4 pr-4"}>
            {
                cards.filter(prod => prod.type === type)
                .map(card => {
                    return(
                        <Card card={card} key={card._id} onClick={() => onClick(card)} />
                    )
                })
            }
        </div>
        </>
    )
}
MenuCategory.propTypes = {
    cards: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

function Card({ card, onClick }) {
    return(
      <div className={styles.card} key={card._id} onClick={onClick} >
            <img src={card.image} alt={card.name} />
            <p className="text text_type_main-default">{card.name}</p>
            <div className={styles.price_container}>
                <p className="text text_type_main-default pr-1">{card.price}</p>
                <CurrencyIcon />
            </div>
      </div>      
    )  
}
Card.propTypes = {
    card: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}