import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styles from './order-ingredient.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getApiIngredients } from "../../services/selectors/selectors";

type TOrderIngredientProps = {
    id: string, 
    counter: number
}
export const OrderIngredient: FunctionComponent<TOrderIngredientProps> = ({ id, counter }: TOrderIngredientProps) => {
    const ingredientsApi = useSelector(getApiIngredients);
    const currentIngredient = ingredientsApi.find(item => item._id === id)!;
    const image = currentIngredient.image;
    return (
        <div className={`${styles.container}`} style={{ justifyContent: "space-between" }}>
            <div className={styles.container} >
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url("${image}")` }}>
                </div>
                <h3 className={`${styles.name} text text_type_main-default ml-4`}>
                    {currentIngredient.name}
                </h3>
            </div>
            <div className={styles.container} style={{alignItems: 'center'}}>
                <p className="text text_type_digits-default mr-2">
                    {`${counter} x ${currentIngredient.price}`}
                </p>
                <CurrencyIcon type='primary' />
            </div>
        </div>
    )
}
