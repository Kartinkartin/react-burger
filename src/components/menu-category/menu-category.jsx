import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import styles from './menu-category.module.css';
import { Ingredient } from "../ingredient/ingredient";

export default function MenuCategory({cards, type, refer, onClick}) {
    const types = {
        bun: 'Булки',
        sauce: 'Соусы',
        main: 'Начинки'
    }
    return (
        <>
        <h2 ref={refer} className={`${styles.title} pt-10 pb-6 text text_type_main-medium`}>{types[type]}</h2>
        <div className={`${styles.category} pl-4 pr-4`}>
            {
                useMemo(() => {return cards.filter(prod => prod.type === type)
                .map(card => {
                    return(
                        <Ingredient card={card} key={card._id} onClick={() => onClick(card)} />
                    )
                })}, [cards])
            }
        </div>
        </>
    )
}
MenuCategory.propTypes = {
    cards: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    refer: PropTypes.object.isRequired,
    onClick: PropTypes.func
}