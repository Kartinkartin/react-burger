import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import styles from './order-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { getApiIngredients } from "../../services/selectors/selectors";




export default function OrderIngredient({ id, counter }) {
    const ingredientsApi = useSelector(getApiIngredients);
    const currentIngredient = ingredientsApi.find(item => item._id === id);
    const image = currentIngredient.image;
    return (
        <div className={`${styles.container}`} style={{ justifyContent: "space-between" }}>
            <div className={styles.container}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url("${image}")` }}>
                </div>
                <h3 className={`${styles.name} text text_type_main-default ml-4`}>
                    {currentIngredient.name}
                </h3>
            </div>
            <div className={styles.container}>
                <p className="text text_type_digits-default mr-2">
                    {`${counter} x ${currentIngredient.price}`}
                </p>
                <CurrencyIcon />
            </div>
        </div>
    )
}
OrderIngredient.propTypes = {
    id: PropTypes.string.isRequired,
    counter: PropTypes.number.isRequired
}