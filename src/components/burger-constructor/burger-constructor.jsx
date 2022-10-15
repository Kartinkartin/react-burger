import React, { useEffect, useState, useReducer, useMemo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import LayerElement from "../layer-element/layer-element";
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
    SORT_INGREDIENTS_IN_CONSTRUCTOR,
    DELETE_INGREDIENT_FROM_CONSTRUCTOR
} from "../../services/actions/constructorItems";
import { RESET_ORDER_NUMBER } from "../../services/actions/order";
import { getCookie, postOrder, refreshUser } from "../../services/actions";



export default function BurgerConstructor() {
    const history = useHistory();
    const dispatch = useDispatch();
    const itemsMenu = useSelector(store => store.ingredientsApi);
    const ingredientsConstructor = useSelector(store => store.constructorItems.ingredientsConstructor);
    const orderNum = useSelector(store => store.order.number.toString());
    const accessToken = useSelector(store => store.login.token);
    const [bunEl, setBunEl] = useState(null);
    const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type !== 'bun')
    const [isSort, setIsSort] = useState(false);
    const [droppedIndex, setDroppedIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [openingOrder, setOpeningOrder] = React.useState(false);
    const wasLogged = document.cookie.includes('refreshToken');

    const handleDrag = (draggedTargetIndex) => {
        setIsSort(true);
        setDraggedIndex(draggedTargetIndex)
    };
    const handleDrop = (e, droppedTargetIndex) => {
        e.preventDefault();
        setDroppedIndex(droppedTargetIndex)
    };

    const [, targetDrop] = useDrop({
        accept: 'item',
        drop(item) {
            if (isSort) sortIngredientsInConstructor(item, droppedIndex, draggedIndex)
            else {
                item.type === 'bun' ?
                    changeBunInConstructor(item) :
                    addIngredientToConstructor(item)
            };

        }
    })

    const addIngredientToConstructor = (prod) => {
        dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: prod
        });
    }
    const changeBunInConstructor = (bun) => {
        dispatch({
            type: ADD_OR_CHANGE_BUN_IN_CONSTRUCTOR,
            item: bun
        })
    }
    const sortIngredientsInConstructor = (item, droppedIndex, draggedIndex) => {
        dispatch({
            type: SORT_INGREDIENTS_IN_CONSTRUCTOR,
            draggedIndex: draggedIndex,
            droppedIndex: droppedIndex,
            item: item
        })
        setIsSort(false);
        setDraggedIndex(null);
        setDroppedIndex(null);
    };
    const handleDeleteItem = (e, index) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0];
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            ingredients: notBunsIngredients,
            id: id,
        })
    };
    
    const makeOrder = async () => {
        const tokenLifeTime = 20 * 60 * 1000; // 20 min
        if (wasLogged) {
            const tokenDate = new Date(getCookie('date'));
            if ((new Date() - tokenDate > tokenLifeTime) || !accessToken ) {
                const refreshToken = getCookie('refreshToken');
                await dispatch(postOrder(ingredientsConstructor, accessToken))
                // я знаю, что тут беда, reducer на изменение store работает позже, чем оба диспатча. нет идеи, как положить в стор accessToken первее. Поэтому после обновления страницы, уходит запрос с еще пуcnым токеном из store. на этого наставника надежды у меня вообще нет(
            }           
            dispatch(postOrder(ingredientsConstructor, accessToken))
            setOpeningOrder(true);
        }
        else {
            history.replace({ pathname: '/login' })
        }
    }
    function closePopup() {
        setOpeningOrder(false);
        dispatch({
            type: RESET_ORDER_NUMBER
        })
    }

    useEffect(() => {
        if (ingredientsConstructor.length) {
            setBunEl(ingredientsConstructor.find(el => el.type === 'bun') || null);
        }

    }, [ingredientsConstructor]);
    
    const totalPrice = useMemo(() => {
        return ingredientsConstructor.reduce((price, current) => {
            if (current.type == 'bun') { return price + 2 * current.price }
            else { return price + current.price }
        }, 0)
    }, [ingredientsConstructor])

    return (
        <section className={`${styles.constructor} pt-25 pl-4 pr-4`} ref={targetDrop}>
            {itemsMenu.length && ingredientsConstructor.length ?
                <>
                    {bunEl &&
                        (<div className={`${styles.constructor_element} pb-4`} >
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bunEl.name + " (верх)"}
                                price={bunEl.price}
                                thumbnail={bunEl.image}
                            />
                        </div>)
                    }
                    <ul className={styles.layers_list}>
                        {(notBunsIngredients.length) ?
                            (notBunsIngredients
                                .map((item, index) => {
                                    return (
                                        <LayerElement
                                            prod={item}
                                            index={index}
                                            key={uuidv4()}
                                            handleDelete={handleDeleteItem}
                                            handleDrag={handleDrag}
                                            handleDrop={handleDrop}
                                        />
                                    )
                                })) :
                            (<p className={`${styles.layers_text} text text_type_main-default`}>Добавь начинок к булонькам!</p>)
                        }
                    </ul>
                    {bunEl &&
                        <div className={`${styles.constructor_element} pt-4`}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bunEl.name + " (низ)"}
                                price={bunEl.price}
                                thumbnail={bunEl.image}
                            />
                        </div>}

                    <div className={`${styles.order_box} pt-10 pb-10`}>
                        <div className={`${styles.price_container} pr-10`}>
                            <span className="text text_type_digits-medium pr-2">{totalPrice}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            onClick={makeOrder}
                            disabled={!bunEl}
                            htmlType='button' >
                            Сделать заказ
                        </Button>
                    </div>
                </>
                :
                <p className={`${styles.invite} text text_type_main-default`}>
                    Перетащи сюда ингредиенты для своего бургера
                </p>
            }
            {openingOrder &&
                (<Modal onClose={closePopup} >
                    <OrderDetails number={orderNum} />
                </Modal>)
            }
        </section>
    )
}

