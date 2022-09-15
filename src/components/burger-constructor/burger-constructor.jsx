import React, { useEffect, useState, useReducer } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { CurrencyIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import { Layer } from "../layer/layer";

import { 
    //GET_CONSTRUCTOR_ITEMS, 
    ADD_INGREDIENT_TO_CONSTRUCTOR, 
    ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
    SORT_INGREDIENTS_IN_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR } from "../../services/actions";

export default function BurgerConstructor({ onClick }) {
    const dispatch = useDispatch();
    const itemsMenu = useSelector(store => store.ingredientsApi);
    const ingredientsConstructor = useSelector(store=> store.ingredientsConstructor);
    
    const [bunEl, setBunEl] = useState({});
    const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type != 'bun')
    const [isSort, setIsSort] = useState(false) ;
    const [droppedIndex, setdroppedIndex] = useState(false);
    const [draggedIndex, setdraggedIndex] = useState(false)

    const handleDrag = (draggedTargetIndex) => {
        setIsSort(true);
        setdraggedIndex(draggedTargetIndex)
    };
    const handleDrop = (e, droppedTargetIndex) => {
        e.preventDefault();
        setdroppedIndex(droppedTargetIndex)
    };
    
    const [ ,targetDrop] = useDrop({
        accept: 'item',
        drop(item) {
            isSort ? 
                sortIngredientsInConstructor(item, droppedIndex, draggedIndex)
                :
                (
                    (item.type === 'bun' ? 
                    changeBunInConstructor(item) : 
                    addIngredientToConstructor(item))
                );
            
        }
    })

    const addIngredientToConstructor =(prod) => {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: prod
        });
        dispatchPrice({
            type: 'increment',
            item: prod
        })
    }
    const changeBunInConstructor = (bun) => {
        dispatch({
            type: ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
            item: bun
        })
        dispatchPrice({
            type: 'increment',
            item: bun
        })
    }
    const sortIngredientsInConstructor = (item, droppedIndex, draggedIndex) => {
        if(droppedIndex > draggedIndex) {
            notBunsIngredients.splice(droppedIndex+1, 0, item);
            notBunsIngredients.splice(draggedIndex, 1)
        }
        if(droppedIndex < draggedIndex) {
            notBunsIngredients.splice(draggedIndex, 1);
            notBunsIngredients.splice(droppedIndex, 0, item)
        } 
        dispatch({
            type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
            ingredients: notBunsIngredients
        })    
        setIsSort(false);
        setdraggedIndex(false);
        setdraggedIndex(false);
    };
    const handleDeleteItem = (e, index) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0];
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            ingredients: notBunsIngredients,
            id: id,
        })
        dispatchPrice({
            type: 'decrement',
            item: item
        })
    };

    useEffect(()=> {
        if (ingredientsConstructor.length) setBunEl( ingredientsConstructor.find(el=>el.type==='bun') ? ingredientsConstructor.find(el=>el.type==='bun') : {});
    }, [ingredientsConstructor.length, ingredientsConstructor]);

    const [state, dispatchPrice] = useReducer(reducer, {price: 0});
    function reducer(state, action) {
        switch (action.item.type)
        {
            case ('bun'): return ( bunEl.price ? 
                {price: state.price - (bunEl.price*2) + (action.item.price*2)} : 
                {price: state.price + (action.item.price*2)} )
            case ('main'): 
                switch (action.type) {
                    case ('increment'): {
                        return ({price: state.price + action.item.price})
                    }
                    case ('decrement'): {
                        return ({price: state.price - action.item.price})
                    }
                    default: throw new Error();
                }
            case ('sauce'): 
            switch (action.type) {
                case ('increment'): {
                    return ({price: state.price + action.item.price})
                }
                case ('decrement'): {
                    return ({price: state.price - action.item.price})
                }
                default: throw new Error();
            }
            default: throw new Error();
        }
    }
    const totalPrice = state.price;
    return(
        <section className={styles.constructor + ' ' + 'pt-25 pl-4 pr-4'} ref={targetDrop}>
            {itemsMenu.length && ingredientsConstructor.length ?  
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
                    .map((item, index) => {
                        return(
                            <Layer prod={item} index={index} key={item._id + Math.random().toString(7).slice(2, 7)} handleDelete={handleDeleteItem} handleDrag={handleDrag} handleDrop={handleDrop}/> 
                        )
                    }) :
                    <p className={ styles.layers_text + " text text_type_main-default"}>Добавь начинок к булонькам!</p>
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
                <Button type="primary" size="large" onClick={onClick} disabled={!bunEl.name}> 
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
