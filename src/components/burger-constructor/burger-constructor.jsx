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
import OrderInfo from "../order-info/order-info";
import {
    addIngredient,
    addOrChangeBun,
    deleteIngredient,
    postOrder,
    refreshUser,
    resetOrderNum,
    sortIngredients
} from "../../services/actions";
import { getCookie } from "../../services/utils/cookie";
import { getAccessToken, getApiIngredients, getConstructorIngedients, getOrderNum } from "../../services/selectors/selectors";



export default function BurgerConstructor() {
    const history = useHistory();
    const dispatch = useDispatch();
    const itemsMenu = useSelector(getApiIngredients);
    const ingredientsConstructor = useSelector(getConstructorIngedients);
    const orderNum = useSelector(getOrderNum);
    const accessToken = useSelector(getAccessToken);
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
                const key = uuidv4();
                item.type === 'bun' ?
                    dispatch(addOrChangeBun(item)) :
                    dispatch(addIngredient({...item, key: key}))
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
        const item = notBunsIngredients.splice(index, 1)[0]; // изменяет notBunsIngredients
        dispatch(deleteIngredient(notBunsIngredients, id))
    };

    // проверяет актаульность и наличие токена в store, потом выполняет переданный action
    // эту функцию лучше вынести извне компонента и сделать ее более гибкой, 
    // чтобы она принимала помимо токена и экшена еще и 
    // набор аргументов для экшена и далее сама диспатчила переданный 
    // экшен со всеми его аргументами. Это позволит использовать 
    // ее во всех подобных случаях. Назвать можно как то 
    // performActionWithRefreshedToken, которая будет выполнять просто экшен, 
    // если с токеном все ок и обновлять токен, а потом выполнять экшен, если токен истёк. 
    // Но над названием можно подумать еще)
    const handlePerformeAction = (accessToken, action) => {
        const tokenLifeTime = 20 * 60 * 1000; // 20 min
        const tokenDate = new Date(getCookie('date'));
        if ((new Date() - tokenDate < tokenLifeTime) && accessToken) {
            dispatch(action(ingredientsConstructor, accessToken));
        }
        if ((new Date() - tokenDate > tokenLifeTime) || !accessToken) {
            const refreshToken = getCookie('refreshToken');
            dispatch(refreshUser(refreshToken))
            .then(accessToken => dispatch(action(ingredientsConstructor, accessToken)))
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
            if (current.type === 'bun') { return price + 2 * current.price }
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
                                            key={item.key}
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
                    <OrderInfo number={orderNum} />
                </Modal>)
            }
        </section>
    )
}
