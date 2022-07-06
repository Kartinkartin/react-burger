import React from "react";
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './burger-ingredients.css';

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one');
    const cardsData = props.cards.data;
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
            <h2 className="title pt-10 pb-6 text text_type_main-medium">Булки</h2>
            <div className="menu pl-4 pr-4">
                ghklxh
            </div>
            <h2 className="title pt-10 pb-6 text text_type_main-medium">Соусы</h2>
            <h2 className="title pt-10 pb-6 text text_type_main-medium">Начинки</h2>
            </div>
        </section>
    )
}

function Card(props) {
    return(
    <div>fgh</div>
    )
}
