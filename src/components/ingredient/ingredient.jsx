import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";



export function Ingredient({ card }) {
    const location = useLocation();
    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: card,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    })
    const counter = useSelector(state => state.constructorItems.counter[card._id]);

    return (
        <Link
            to={{ pathname: `/ingredients/${card._id}`, state: { background: location } }}
            className={styles.link}>
            <div className={styles.ingredient_available} key={card._id} ref={dragRef} style={{ opacity }} draggable >
                <img src={card.image} alt={card.name} />
                <p className="text text_type_main-default">{card.name}</p>
                <div className={styles.price_container}>
                    <p className="text text_type_main-default pr-1">{card.price}</p>
                    <CurrencyIcon />
                </div>
                {!!counter && <Counter count={counter} size="default" />}
            </div>
        </Link>
    )
}
Ingredient.propTypes = {
    card: PropTypes.object.isRequired,
}
