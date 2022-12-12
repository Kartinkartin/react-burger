import React, { FunctionComponent } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from "../../services/hooks/hooks";
import { getApiIngredients } from "../../services/selectors/selectors";
import styles from "./ingredient-detail.module.css";

export const IngredientDetail: FunctionComponent = () => {
    const { id }: { id: string } = useParams();
    const elements = useSelector(getApiIngredients);
    const element = elements.find(el => el._id === id);
    if (element) {
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
    return null
}
