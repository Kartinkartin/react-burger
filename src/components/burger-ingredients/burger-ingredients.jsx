import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { Box } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';
import {
    SET_INFO_CHOSEN_INGREDIENT,
    DELETE_INFO_CHOSEN_INGREDIENT
} from "../../services/actions/chosenIngredient";
import MenuCategory from "../menu-category/menu-category";
import Modal from '../modal/modal';
import IngredientDetail from "../ingredient-detail/ingredient-detail";


export default function BurgerIngredients() {
    const dispatch = useDispatch();
    const items = useSelector(store => store.ingredientsApi);
    const [openingDetails, setOpeningDetails] = React.useState(false);
    const chosenItem = useSelector(store => store.chosenIngredient);
    

    const [current, setCurrent] = React.useState('bun');
    const containerRef = useRef();
    const bunRef = useRef();
    const mainRef = useRef();
    const sauceRef = useRef();

    const hightlightTab = () => {
        const refs = [bunRef, mainRef, sauceRef];
        const positions = refs.map(item => {
            return Math.abs(item.current.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top)
        })
        const currentTabRef = refs[positions.indexOf(Math.min.apply(null, positions))];
        const currentSection = currentTabRef.current.dataset.type; // dataset.type - чтение атрибута data-type, см. MenuCategory -> h2.data-type (так и называется data-* атрибуты)
        setCurrent(currentSection)
    }
    const handlerScroll = (value) => {
        setCurrent(value);
        if (value === 'bun') { bunRef.current.scrollIntoView() }
        else if (value === 'sauce') { sauceRef.current.scrollIntoView() }
        else { mainRef.current.scrollIntoView() }
    }

    function openIngredientsDetail(card) {
        dispatch({
            type: SET_INFO_CHOSEN_INGREDIENT,
            item: card
        })
        setOpeningDetails(true);
    }
    function closePopup() {
        setOpeningDetails(false);
        dispatch({
            type: DELETE_INFO_CHOSEN_INGREDIENT
        })
    }
    return (
        <section className={styles.ingridients}>
            <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={handlerScroll}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handlerScroll}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handlerScroll}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.menu} ref={containerRef} onScroll={hightlightTab}>
                <MenuCategory cards={items} type='bun' refer={bunRef} onClick={openIngredientsDetail} headerKey='bun' />
                <MenuCategory cards={items} type='sauce' refer={sauceRef} onClick={openIngredientsDetail} headerKey='sauce' />
                <MenuCategory cards={items} type='main' refer={mainRef} onClick={openIngredientsDetail} headerKey='main' />
            </div>
            {openingDetails &&
                (<Modal title='Детали заказа' onClose={closePopup} >
                    <IngredientDetail element={chosenItem} />
                </Modal>)
            }
        </section>
    )
}
