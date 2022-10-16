import React, { useEffect, useState, useMemo } from "react";
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
    addIngredient,
    addOrChangeBun,
    deleteIngredient,
    postOrder,
    refreshUser,
    resetOrderNum,
    sortIngredients
} from "../../services/actions";
import { getCookie, setCookie } from "../../services/utils/cookie";
import { refreshTokenRequest } from "../api/api";
import { REFRESH_USER } from "../../services/actions/login";



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
                    dispatch(addOrChangeBun(item)) :
                    dispatch(addIngredient(item))
            };

        }
    })

    const sortIngredientsInConstructor = (item, droppedIndex, draggedIndex) => {
        dispatch(sortIngredients(item, droppedIndex, draggedIndex));
        setIsSort(false);
        setDraggedIndex(null);
        setDroppedIndex(null);
    };
    const handleDeleteItem = (e, index) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0];
        dispatch(deleteIngredient(notBunsIngredients, id))
    };

    // проверяет актаульность и наличие токена в store, потом выполняет переданный action
    const handlePerformeAction = (accessToken, action) => {
        const tokenLifeTime = 20 * 60 * 1000; // 20 min
        const tokenDate = new Date(getCookie('date'));
        if ((new Date() - tokenDate < tokenLifeTime) && accessToken) {
            dispatch(action(ingredientsConstructor, accessToken));
        }
        if ((new Date() - tokenDate > tokenLifeTime) || !accessToken) {
            const refreshToken = getCookie('refreshToken');
            Promise.resolve(dispatch(refreshUser(refreshToken)))
            .then(accessToken => dispatch(action(ingredientsConstructor, accessToken)))
            // так долго мучалась, я сейчас зарыдаю Т.Т я примерно так и думала, но тупила по-черному(
            // умываясь слезами счастья, не могу теперь придумать имя XD в рабочем варианте я обозвала ее magic XD 
            // СПАСИБО!!!!  
        }     
    }

    const makeOrder = () => {
        if (wasLogged) {
            handlePerformeAction(accessToken, postOrder)
            setOpeningOrder(true);
        }
        else {
            history.replace({ pathname: '/login' })
        }
    }
    function closePopup() {
        setOpeningOrder(false);
        dispatch(resetOrderNum())
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

