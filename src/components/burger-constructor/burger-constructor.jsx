import React, { useEffect, useMemo, useReducer } from "react";
import { useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css"
import { useDispatch, useSelector } from "react-redux";
import { 
    //GET_CONSTRUCTOR_ITEMS, 
    ADD_INGREDIENT_TO_CONSTRUCTOR, 
    ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR } from "../../services/actions";

export default function BurgerConstructor({ onClick }) {
    const dispatch = useDispatch();
    const items = useSelector(store => store.ingredientsApi);
    const ingredientsConstructor = useSelector(store=> store.ingredientsConstructor);
    
    const [bunEl, setBunEl] = React.useState({});
    const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type != 'bun')

    const [ ,targetDrop] = useDrop({
        accept: 'item',
        drop(item) {
            item.type === 'bun' ? 
            changeBunInConstructor(item) : 
            addIngredientToConstructor(item);
            dispatchPrice(item);
        }
    })

    const addIngredientToConstructor =(prod) => {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: prod
        })
    }
    const changeBunInConstructor = (bun) => {
        dispatch({
            type: ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
            item: bun
        })
    }

    useEffect(()=> {
        if (ingredientsConstructor.length) setBunEl( ingredientsConstructor.find(el=>el.type==='bun') ? ingredientsConstructor.find(el=>el.type==='bun') : {});
    }, [ingredientsConstructor.length, ingredientsConstructor]);

    const [state, dispatchPrice] = useReducer(reducer, {price: 0});
    function reducer(state, item) {
        switch (item.type)
        {
            case ('bun'): return ({price: state.price + (item.price*2)})//здесь из стоимости надо удалять другую булку, а то они просто плюсуются при замене
            case ('main'): return ({price: state.price + item.price})
            case ('sauce'): return ({price: state.price + item.price})
            default: throw new Error();
        }
    }

    const totalPrice = state.price;
    return(
        <section className={styles.constructor + ' ' + 'pt-25 pl-4 pr-4'} ref={targetDrop}>
            {items.length && ingredientsConstructor.length ?  
            <>
            { bunEl.name &&
            <div className={styles.constructor_element + " pb-4"} >
                <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bunEl.name + " (верх)"}
                        price={bunEl.price}
                        thumbnail={bunEl.image}
                    /> 
            </div>}
            <ul className={styles.layers_list}>
                {   notBunsIngredients.length ?
                    notBunsIngredients
                    .map(item => {
                        return(
                            <Layer prod={item} key={item._id + Math.random().toString(7).slice(2, 7)} /> 
                        )
                    }) :
                    <p>Добавь начинок к булонькам!</p>
                }
            </ul>
            { bunEl.name &&
            <div className={styles.constructor_element + " pt-4"}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bunEl.name + " (низ)"}
                    price={bunEl.price}
                    thumbnail={bunEl.image}
                />
            </div>}

            <div className={styles.order_box + " " + "pt-10 pb-10"}>
                <div className={"styles.price_container pr-10"}>
                    <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={onClick}>
                    Сделать заказ
                </Button>
            </div>
            </>
            : <p className={ styles.invite + " text text_type_main-default"}> Перетащи сюда ингредиенты для своего бургера </p>
    }
        </section>
    )
}

BurgerConstructor.propTypes = {
    onClick: PropTypes.func.isRequired,
}
function Layer({ prod }) {
    return(
        <li className={styles.layer_element + " " + "pb-4"}>
            <DragIcon />
            <ConstructorElement
                text={prod.name}
                price={prod.price}
                thumbnail={prod.image}
            />
        </li>
    )
}

Layer.propTypes = {
    prod: PropTypes.object.isRequired
}
