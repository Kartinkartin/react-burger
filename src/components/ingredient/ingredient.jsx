import React from "react";
import PropTypes from "prop-types";
import styles from './ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export function Ingredient({ card, onClick }) {
    return(
      <div className={styles.ingredient_available} key={card._id} onClick={onClick} >
            <img src={card.image} alt={card.name} />
            <p className="text text_type_main-default">{card.name}</p>
            <div className={styles.price_container}>
                <p className="text text_type_main-default pr-1">{card.price}</p>
                <CurrencyIcon />
            </div>
      </div>      
    )  
}
Ingredient.propTypes = {
    card: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
}