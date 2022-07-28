import React, { useContext, useEffect, useMemo, useReducer } from "react";
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-constructor.module.css"
import { useDispatch, useSelector } from "react-redux";
import { GET_CONSTRUCTOR_ITEMS } from "../../services/actions";

export default function BurgerConstructor({ onClick }) {
    const dispatch = useDispatch();
    const items = useSelector(store => store.ingredientsApi);
    const ingredientsConstructor = useSelector(store=> store.ingredientsConstructor);
    const [bunEl, setBunEl] = React.useState({});
    const currentOrder = [];
    currentOrder.push( useMemo(() => {return items.find(el=>el.type==='bun')}, [items] ));
    useMemo(() => {
        return items.forEach(el=>{
        if(el.type!='bun') {currentOrder.push(el)}
    })}, [items])
    React.useEffect(()=> {
        if (items.length) setBunEl( items.find(el=>el.type==='bun') );
    }, [items.length]);
    const [state, dispatchPrice] = useReducer(reducer, {price: 0});
    function reducer(state, item) {
        switch (item.type)
        {
            case ('bun'): return ({price: state.price + (item.price*2)})
            case ('main'): return ({price: state.price + item.price})
            case ('sauce'): return ({price: state.price + item.price})
            default: throw new Error();
        }
    }

    useEffect(()=> {
        if(items.length){
            currentOrder.forEach(item => {
                dispatchPrice(item)
            })
            dispatch({
                type: GET_CONSTRUCTOR_ITEMS,
                items: currentOrder
            })
        }
    }
    ,[items.length]
    )

    const totalPrice = state.price;
    return(
        <section className={styles.constructor + ' ' + 'pt-25 pl-4 pr-4'}>
            {items.length ?  
            <><div className={styles.constructor_element}>
            <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bunEl.name + " (верх)"}
                    price={bunEl.price}
                    thumbnail={bunEl.image}
                /> 
            </div>
            <ul className={styles.layers_list + " " + "pt-4 pb-4"}>
                {
                    items
                    .filter(prod => prod.type != 'bun')
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
                    text={bunEl.name + " (низ)"}
                    price={bunEl.price}
                    thumbnail={bunEl.image}
                />
            </div>

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
        : 'loading'
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