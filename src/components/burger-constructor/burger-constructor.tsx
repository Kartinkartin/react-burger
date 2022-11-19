import React, { useEffect, useState, useMemo, FunctionComponent } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // библиотека uuid для генерации уникального ключа 
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css";
import { LayerElement } from "../layer-element/layer-element";
import { Modal } from '../modal/modal';
import { OrderInfo } from "../order-info/order-info";
import {
    addIngredient,
    addOrChangeBun,
    deleteIngredient,
    performActionWithRefreshedToken,
    postOrder,
    resetOrderNum,
    sortIngredients
} from "../../services/actions";
import { getAccessToken, getApiIngredients, getConstructorIngedients, getOrderNum } from "../../services/selectors/selectors";
import { TIngredient } from "../../services/types/data";
import { AppDispatch } from "../../services/types";



export const BurgerConstructor: FunctionComponent = () => {
    const history = useHistory();
    const dispatch: AppDispatch = useDispatch();
    const itemsMenu = useSelector(getApiIngredients);
    const ingredientsConstructor = useSelector(getConstructorIngedients);
    const orderNum = useSelector(getOrderNum);
    const accessToken = useSelector(getAccessToken);
    const [bunEl, setBunEl] = useState<TIngredient | null>(null);
    const notBunsIngredients = ingredientsConstructor.filter(prod => prod.type !== 'bun')
    const [isSort, setIsSort] = useState(false);
    const [droppedIndex, setDroppedIndex] = useState(null);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [openingOrder, setOpeningOrder] = useState(false);
    const wasLogged = document.cookie.includes('refreshToken');

    const handleDrag = (draggedTargetIndex: any) => {
        setIsSort(true);
        setDraggedIndex(draggedTargetIndex)
    };
    const handleDrop = (e: { preventDefault: () => void; }, droppedTargetIndex: any) => {
        e.preventDefault();
        setDroppedIndex(droppedTargetIndex)
    };

    const [, targetDrop] = useDrop({
        accept: 'item',
        drop(item: TIngredient) {
            if (isSort) sortIngredientsInConstructor(item, droppedIndex, draggedIndex)
            else {
                const key = uuidv4();
                item.type === 'bun' ?
                    addOrChangeBun(item, key)(dispatch) :
                    addIngredient({...item, key: key})(dispatch)
            };

        }
    })

    const sortIngredientsInConstructor = (item: TIngredient, droppedIndex: any, draggedIndex: any) => {
        sortIngredients(item, droppedIndex, draggedIndex)(dispatch);
        setIsSort(false);
        setDraggedIndex(null);
        setDroppedIndex(null);
    };
    const handleDeleteItem = (e: any, index: number) => {
        const id = notBunsIngredients[index]._id;
        const item = notBunsIngredients.splice(index, 1)[0]; // изменяет notBunsIngredients
        deleteIngredient(notBunsIngredients, id)(dispatch)
    };

    const makeOrder = () => {
        if (wasLogged) {
            performActionWithRefreshedToken(accessToken, postOrder, ingredientsConstructor)(dispatch)
            setOpeningOrder(true);
        }
        else {
            history.replace({ pathname: '/login' })
        }
    }
    function closePopup() {
        setOpeningOrder(false);
        resetOrderNum()(dispatch)
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