import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getApiIngredients } from "../../services/selectors/selectors";
import styles from "./ingredient-detail.module.css";

export default function IngredientDetail() {
    const { id } = useParams();
    const elements = useSelector(getApiIngredients);
    const element = elements.find(el => el._id === id);
    return (
        element && (
            <>
            <img src={element.image} alt='ingredient' className={styles.image} />
            <p className={`${styles.title} text text_type_main-medium pt-4 pb-8`}>
                {element.name}
            </p>
            <ul className={`${styles.description} pr-15 pl-15`}>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">
                        Калории,ккал
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {element.calories}
                    </p>
                </li>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">
                        Белки, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {element.proteins}
                    </p>
                </li>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">
                        Жиры, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {element.fat}
                    </p>
                </li>
                <li className={styles.description_element}>
                    <p className="text text_type_main-default text_color_inactive pb-2">
                        Углеводы, г
                    </p>
                    <p className="text text_type_main-default text_color_inactive">
                        {element.carbohydrates}
                    </p>
                </li>
            </ul>
        </>
        )
    )
}
