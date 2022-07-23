import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css"
import { DataContext, OrderContext } from "../../services/appContext";

export default function BurgerConstructor({ onClick }) {
    const {cards} = useContext(DataContext);
    const { orderList, setOrderList } = useContext(OrderContext);
    const currentOrder = [];
    currentOrder.push( cards.find(el=>el.type==='bun') );
    cards.forEach(el=>{
        if(el.type!='bun') {currentOrder.push(el)}
    })
    debugger;
    return(
        <section className={styles.constructor + ' ' + 'pt-25 pl-4 pr-4'}>
            <div className={styles.constructor_element}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price="1255"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                />
            </div>
            <ul className={styles.layers_list + " " + "pt-4 pb-4"}>
                {
                    cards
                    .filter(prod => prod.type == 'main')
                    .map(item => {
                        return(
                            <Layer prod={item} key={item._id} />
                        )
                    })
                }
            </ul>
            <div className={styles.constructor_element}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price="1255"
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                />
            </div>

            <div className={styles.order_box + " " + "pt-10 pb-10"}>
                <div className={"styles.price_container pr-10"}>
                    <span className="text text_type_digits-medium pr-2">610</span>
                    <CurrencyIcon />
                </div>
                <Button type="primary" size="large" onClick={onClick}>
                    Сделать заказ
                </Button>
            </div>
            
        </section>
    )
}

BurgerConstructor.propTypes = {
    cards: PropTypes.array.isRequired,
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