import React from "react";
import PropTypes from 'prop-types';
import styles from "./ingredient-detail.module.css";

export default function IngredientDetail({ element }) {
    return (
        <>
            <img src={element.image} className={styles.image} />
            <p className=" text text_type_main-medium pt-4 pb-8">
                {element.name}
            </p>
            <ul className={styles.description + " " + "pr-15 pl-15"}>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Калории,ккал</p>
                    <p className="text text_type_main-default text_color_inactive">{element.calories}</p>
                </li>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Белки, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.proteins}</p>
                </li>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Жиры, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.fat}</p>
                </li>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">Углеводы, г</p>
                    <p className="text text_type_main-default text_color_inactive">{element.carbohydrates}</p>
                </li>
            </ul>
        </>
    )
}
IngredientDetail.propTypes = {
    element: PropTypes.object.isRequired
}
