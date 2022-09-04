import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";


export function Ingredient({ card, onClick }) {
    const [ { opacity, isDragging } ,dragRef] = useDrag({
        type: 'item', /*card.type*/
        item: card,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            isDragging: monitor.isDragging()
        })
    })
    const counter = useSelector(state => state.counter[card._id]);
    return(
        //представление в разделе ингредиентов, надо дополнить отображение для конструктора еще
      <div className={styles.ingredient_available} key={card._id} onClick={onClick} ref={dragRef} style={ {opacity} } >
            <img src={card.image} alt={card.name} />
            <p className="text text_type_main-default">{card.name}</p>
            <div className={styles.price_container}>
                <p className="text text_type_main-default pr-1">{card.price}</p>
                <CurrencyIcon />
            </div>
            { counter && <Counter count={counter} size="default" />}
      </div>      
    )  
}
Ingredient.propTypes = {
    card: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}