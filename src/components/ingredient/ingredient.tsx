import React, { FunctionComponent } from "react";
import { Link, useLocation } from 'react-router-dom';
import styles from './ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { TIngredient } from "../../services/types/data";
import { TStore } from "../../services/types";
import { useSelector } from "../../services/hooks/hooks";

type TIngredientInfo = {
    card: TIngredient
}

export const Ingredient: FunctionComponent<TIngredientInfo> = ({ card }: TIngredientInfo) => {
    const location = useLocation();
    const [{ opacity }, dragRef] = useDrag({
        type: 'item',
        item: card,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    })
    const counter = useSelector((store: TStore) => store.constructorItems.counter[card._id]);

    return (
        <Link
            to={{ pathname: `/ingredients/${card._id}`, state: { background: location } }}
            className={styles.link}>
            <div className={styles.ingredient_available} key={card._id} ref={dragRef} style={{ opacity }} draggable >
                <img src={card.image} alt={card.name} />
                <p className="text text_type_main-default">{card.name}</p>
                <div className={styles.price_container}>
                    <p className="text text_type_main-default pr-1">{card.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                {!!counter && <Counter count={counter} size="default" />}
            </div>
        </Link>
    )
}
